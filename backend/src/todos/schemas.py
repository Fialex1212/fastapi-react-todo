from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class BaseTodo(BaseModel):
    title: Optional[str] = "Title"
    is_completed: Optional[bool] = False

class TodoCreate(BaseTodo):
    pass

class TodoUpdate(BaseTodo):
    pass

class Todo(BaseTodo):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True