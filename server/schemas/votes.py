from typing import Optional

from pydantic import BaseModel


class VoteBase(BaseModel):
    identifier: str  # IP ou email
    choice: str
    poll_id: int


class VoteCreate(VoteBase):
    pass


class Vote(VoteBase):
    id: int

    class Config:
        orm_mode = True
