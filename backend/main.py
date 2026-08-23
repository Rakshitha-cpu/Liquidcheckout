from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import ai_orchestrator

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "success", "message": "The Liquid Checkout Backend is Running!"}

@app.post("/recover")
def recover(user_id: str, amount: float):
    return ai_orchestrator.recover(user_id, amount)