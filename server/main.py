import os

from external.database import create_database_tables
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routes.ping import ping_router
from routes.poll import poll_router
from routes.vote import vote_router


def start():
    create_database_tables()
    os.system("figlet Voting")


def server():
    start()
    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(ping_router, tags=["Conectividade"])
    application.include_router(poll_router, tags=["Polls"])
    application.include_router(vote_router, tags=["Votes"])

    @application.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"detail": "An unexpected error occurred."},
        )

    @application.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )

    return application
