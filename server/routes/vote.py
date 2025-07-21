from typing import Dict

from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer
from schemas.votes import Vote, VoteCreate

poll_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

vote_router = APIRouter()

# Simulação de armazenamento em memória
votes_db = []


@vote_router.post("/vote/{poll_id}", response_model=Vote)
def post_vote(poll_id: int, vote: VoteCreate):
    vote_data = {
        "id": len(votes_db) + 1,
        "identifier": vote.identifier,
        "choice": vote.choice,
        "poll_id": poll_id,
    }
    votes_db.append(vote_data)
    return vote_data


@vote_router.get("/vote/result/{poll_id}")
def get_result(poll_id: int) -> Dict[str, int]:
    result = {}
    counted = set()
    for v in votes_db:
        if v["poll_id"] == poll_id:
            key = (v["identifier"], v["choice"])
            if key not in counted:
                result[v["choice"]] = result.get(v["choice"], 0) + 1
                counted.add(key)
    return result
