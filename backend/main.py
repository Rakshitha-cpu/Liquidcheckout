from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from recovery_service import RecoveryService

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

svc = RecoveryService()

@app.get("/")
def read_root():
    return {"message": "Liquid Checkout Backend Running"}

@app.post("/recover")
def recover_failed_payment(user_id: str, amount: float):
    if not user_id or amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid user_id or amount must be greater than zero")
        
    try:
        result = svc.recover(user_id, amount)
        if not result.get("recovery"):
            raise HTTPException(status_code=500, detail="Recovery process failed unexpectedly")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.get("/logs/{user_id}")
def get_user_logs(user_id: str):
    logs = svc.get_logs(user_id)
    if not logs:
        raise HTTPException(status_code=404, detail="No logs found for this user")
    return {"logs": logs}