

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from agent import summarize_topic  

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "API is running!"}


class SummaryRequest(BaseModel):
    user_id: str
    query: str


@app.post("/summarize")
def summarize(req: SummaryRequest):
    summary = summarize_topic(req.user_id, req.query)
    return {"summary": summary}


@app.get("/favicon.ico")
def favicon():
    return FileResponse(os.path.join("app", "favicon.ico"))
