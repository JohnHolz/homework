from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer

ping_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@ping_router.get("/ping")
@ping_router.post("/ping")
def ping():
    return {"message": "pong"}
