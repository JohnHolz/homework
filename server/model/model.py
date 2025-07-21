from datetime import datetime

from sqlalchemy import JSON, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Poll(Base):
    __tablename__ = "polls"
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    name = Column(String, nullable=False)
    choices = Column(JSON, nullable=False)
    description = Column(String, nullable=True)


class Votes(Base):
    __tablename__ = "Votes"
    id = Column(Integer, primary_key=True, index=True)
    identifier = Column(String, nullable=False)  # IP ou email
    choice = Column(String, nullable=False)
    poll_id = Column(Integer, ForeignKey("polls.id"), nullable=False)
