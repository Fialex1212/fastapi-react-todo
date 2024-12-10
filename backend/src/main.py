from fastapi import FastAPI
from cors import add_cors
from database import Base, engine, create_tables
from todos.routers import router as todos_router

app = FastAPI()

@app.on_event("startup")
async def startup():
    await create_tables()

add_cors(app)

app.include_router(todos_router, prefix="/api/todo", tags=["todos"])

@app.get("/")
async def root():
    return {"Message": "Hello world"}