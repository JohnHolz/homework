from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class PollBase(BaseModel):
    name: str
    choices: Any  # JSON: pode ser dict ou list
    description: Optional[str] = None


class PollCreate(PollBase):
    pass


class PollUpdate(BaseModel):
    choices: Optional[Any] = None
    description: Optional[str] = None


class PollOut(BaseModel):
    id: int
    name: str
    choices: Any
    description: Optional[str]


class Poll(PollBase):
    id: int
    created_at: Optional[str]

    class Config:
        orm_mode = True
