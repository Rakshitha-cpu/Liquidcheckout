from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from recovery_service import RecoveryService
from database import SessionLocal, PaymentSession

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
        raise HTTPException(status_code=400, detail="Invalid user_id or amount")
        
    try:
        result = svc.recover(user_id, amount)
        if not result.get("recovery"):
            raise HTTPException(status_code=500, detail="Recovery failed")
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Data Validation Error: {str(ve)}")
    except RuntimeError as re:
        raise HTTPException(status_code=502, detail=f"External Service Error: {str(re)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.get("/logs/{user_id}")
def get_user_logs(user_id: str):
    return {"logs": svc.get_logs(user_id)}

@app.get("/stats")
def get_dashboard_stats():
    db = SessionLocal()
    try:
        sessions = db.query(PaymentSession).order_by(PaymentSession.timestamp.desc()).all()
        return {
            "sessions": [
                {
                    "id": s.user_id,
                    "item": s.item,
                    "amount": s.amount,
                    "method": s.method,
                    "recovered": s.recovered,
                    "status": s.status,
                    "time": s.timestamp.isoformat()
                } for s in sessions
            ]
        }
    finally:
        db.close()