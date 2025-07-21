from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from jh_utils.data.sql.object import create_object_DB_by_envfile
import os


db_object = create_object_DB_by_envfile()
engine = db_object.engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def create_schema():
    db = create_object_DB_by_envfile('.env')
    engine = db.engine()
    con = engine.connect()
    con.execute(text("CREATE SCHEMA IF NOT EXISTS scrolls"))
    con.commit()
    os.system('echo schema scrolls created')
    con.close()


def create_database_tables() -> None:
    os.system("echo ----------------------------------------")
    os.system("echo creating schema")
    create_schema()
    Base.metadata.create_all(bind=engine)
    os.system("echo creating tables")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
