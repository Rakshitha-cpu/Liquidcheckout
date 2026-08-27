import time
import json
from typing import Dict, Any, List
from api_clients import create_razorpay_link, gemini_model
from google.api_core.exceptions import GoogleAPIError
from database import SessionLocal, AuditLog
import datetime

class RecoveryService:
    """
    Service responsible for orchestrating the 3-layer AI Revenue Recovery waterfall.
    """
    def __init__(self) -> None:
        pass

    def log(self, user_id: str, event_type: str, details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Immutably logs an event to the persistent SQLite database.
        """
        event_time = datetime.datetime.utcnow()
        details_str = json.dumps(details)
        
        db = SessionLocal()
        try:
            db_log = AuditLog(
                timestamp=event_time,
                user_id=user_id,
                event_type=event_type,
                details=details_str
            )
            db.add(db_log)
            db.commit()
            db.refresh(db_log)
        finally:
            db.close()
            
        print(f"[AUDIT DB] {event_type}: {details}")
        return {
            "timestamp": event_time.strftime("%Y-%m-%d %H:%M:%S"),
            "event_type": event_type,
            "details": details
        }

    def get_logs(self, user_id: str) -> List[Dict[str, Any]]:
        db = SessionLocal()
        try:
            logs = db.query(AuditLog).filter(AuditLog.user_id == user_id).all()
            return [{"id": l.id, "time": l.timestamp.isoformat(), "event": l.event_type, "details": json.loads(l.details)} for l in logs]
        finally:
            db.close()

    def trigger_factoring(self, user_id: str, amount: float) -> Dict[str, Any]:
        self.log(user_id, "layer_1_factoring_started", {"amount": amount})
        prompt = f"""
        You are an AI Risk Analyst for a micro-lending firm. A user ({user_id}) just had a payment fail for ₹{amount}.
        You must decide if we should buy this debt and offer them an EMI plan.
        Assume they have an average credit history. 
        If amount is > ₹1100000, reject it as too risky. Otherwise, approve it.
        Respond ONLY with this exact JSON structure: {{"approved": true or false, "reason": "1 short sentence explaining why"}}
        """
        try:
            response = gemini_model.generate_content(prompt)
            ai_decision = json.loads(response.text)
            self.log(user_id, "gemini_ai_analysis", ai_decision)
            
            if ai_decision.get("approved"):
                merchant_payout = round(amount * 0.95, 2)
                emi = round(amount / 6, 2)
                self.log(user_id, "factoring_approved", {"merchant_receives": merchant_payout, "user_emi": emi})
                return {
                    "success": True, 
                    "method": "factoring", 
                    "merchant_payout": merchant_payout, 
                    "user_emi": emi,
                    "message": f"AI Approved! Pay in 6 EMIs of ₹{emi}/mo. Reason: {ai_decision.get('reason')}"
                }
            else:
                self.log(user_id, "factoring_rejected", {"ai_reason": ai_decision.get('reason')})
                return {"success": False}
        except (json.JSONDecodeError, ValueError) as parse_err:
            self.log(user_id, "ai_parsing_error", {"error": str(parse_err)})
            return {"success": False}
        except GoogleAPIError as api_err:
            self.log(user_id, "ai_network_error", {"error": str(api_err)})
            return {"success": False}

    def trigger_split_tender(self, user_id: str, amount: float) -> Dict[str, Any]:
        self.log(user_id, "layer_2_split_tender_started", {"amount": amount})
        amount1, amount2 = round(amount * 0.6, 2), round(amount * 0.4, 2)
        # Pass a lambda to inject user_id into the api client's log_fn
        link1 = create_razorpay_link(amount1, f"Part 1 for {user_id}", lambda e, d: self.log(user_id, e, d))
        link2 = create_razorpay_link(amount2, f"Part 2 for {user_id}", lambda e, d: self.log(user_id, e, d))
        
        self.log(user_id, "stopping_rule_active", {"rule": "Auto-refund if Part 2 not paid within 15 minutes"})
        return {
            "success": True, "method": "split_tender", 
            "link1_amount": amount1, "link1_url": link1,
            "link2_amount": amount2, "link2_url": link2,
            "message": "Card limit exceeded. Split your bill into 2 payments!"
        }

    def trigger_data_for_debt(self, user_id: str, amount: float) -> Dict[str, Any]:
        self.log(user_id, "layer_3_data_for_debt_started", {"amount_waived": amount})
        return {
            "success": True, "method": "data_for_debt", "amount_waived": amount,
            "task": "Complete a 5-minute product feedback survey to waive your fee!"
        }

    def recover(self, user_id: str, amount: float) -> Dict[str, Any]:
        self.log(user_id, "payment_failed_intercepted", {"amount": amount})

        if amount >= 40000:
            result = self.trigger_factoring(user_id, amount)
            if result.get("success"): return {"recovery": result, "audit": self.get_logs(user_id)}
            result = self.trigger_split_tender(user_id, amount)
            return {"recovery": result, "audit": self.get_logs(user_id)}
        elif 4000 <= amount < 40000:
            return {"recovery": self.trigger_split_tender(user_id, amount), "audit": self.get_logs(user_id)}
        else:
            return {"recovery": self.trigger_data_for_debt(user_id, amount), "audit": self.get_logs(user_id)}
