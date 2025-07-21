from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from schemas.poll import PollCreate, PollOut, PollUpdate

poll_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Simulação de armazenamento em memória
polls_db = {}
poll_id_counter = 1


@poll_router.post("/polls", response_model=PollOut)
def create_poll(poll: PollCreate):
    global poll_id_counter
    poll_data = {
        "id": poll_id_counter,
        "name": poll.name,
        "choices": poll.choices,
        "description": poll.description,
    }
    polls_db[poll_id_counter] = poll_data
    poll_id_counter += 1
    return poll_data


@poll_router.get("/polls/{poll_id}", response_model=PollOut)
def get_poll(poll_id: int):
    poll = polls_db.get(poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    return poll


@poll_router.get("/polls", response_model=List[PollOut])
def get_all_polls():
    return list(polls_db.values())


@poll_router.put("/polls/{poll_id}", response_model=PollOut)
def update_poll(poll_id: int, poll_update: PollUpdate):
    poll = polls_db.get(poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    if poll_update.choices is not None:
        poll["choices"] = poll_update.choices
    if poll_update.description is not None:
        poll["description"] = poll_update.description
    return poll


@poll_router.delete("/polls/{poll_id}")
def delete_poll(poll_id: int):
    if poll_id not in polls_db:
        raise HTTPException(status_code=404, detail="Poll not found")
    del polls_db[poll_id]
    return {"detail": "Poll deleted"}
    return {"detail": "Poll deleted"}
