from fastapi import FastAPI
from cors import add_cors
from database import Base, engine, create_tables
from todos import routers

app = FastAPI()

@app.on_event("startup")
async def startup():
    await create_tables()

add_cors(app)

app.include_router(routers.router, prefix="/api/todo", tags=["todos"])

@app.get("/")
async def root():
    return {"Message": "Hello world"}