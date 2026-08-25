import time
import json
from api_clients import create_razorpay_link, gemini_model

class RecoveryService:
    def __init__(self):
        self.audit_trail = []

    def log(self, event_type, details):
        event = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "event_type": event_type,
            "details": details
        }
        self.audit_trail.append(event)
        print(f"[AUDIT] {event_type}: {details}")
        return event

    def trigger_factoring(self, user_id, amount):
        self.log("layer_1_factoring_started", {"user": user_id, "amount": amount})
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
            self.log("gemini_ai_analysis", ai_decision)
            
            if ai_decision.get("approved"):
                merchant_payout = round(amount * 0.95, 2)
                emi = round(amount / 6, 2)
                self.log("factoring_approved", {"merchant_receives": merchant_payout, "user_emi": emi})
                return {
                    "success": True, 
                    "method": "factoring", 
                    "merchant_payout": merchant_payout, 
                    "user_emi": emi,
                    "message": f"AI Approved! Pay in 6 EMIs of ₹{emi}/mo. Reason: {ai_decision.get('reason')}"
                }
            else:
                self.log("factoring_rejected", {"ai_reason": ai_decision.get('reason')})
                return {"success": False}
        except Exception as e:
            self.log("ai_error", {"error": str(e)})
            return {"success": False}

    def trigger_split_tender(self, user_id, amount):
        self.log("layer_2_split_tender_started", {"user": user_id, "amount": amount})
        amount1, amount2 = round(amount * 0.6, 2), round(amount * 0.4, 2)
        link1 = create_razorpay_link(amount1, f"Part 1 for {user_id}", self.log)
        link2 = create_razorpay_link(amount2, f"Part 2 for {user_id}", self.log)
        
        self.log("stopping_rule_active", {"rule": "Auto-refund if Part 2 not paid within 15 minutes"})
        return {
            "success": True, "method": "split_tender", 
            "link1_amount": amount1, "link1_url": link1,
            "link2_amount": amount2, "link2_url": link2,
            "message": "Card limit exceeded. Split your bill into 2 payments!"
        }

    def trigger_data_for_debt(self, user_id, amount):
        self.log("layer_3_data_for_debt_started", {"user": user_id, "amount_waived": amount})
        return {
            "success": True, "method": "data_for_debt", "amount_waived": amount,
            "task": "Complete a 5-minute product feedback survey to waive your fee!"
        }

    def recover(self, user_id: str, amount: float):
        self.audit_trail.clear()
        self.log("payment_failed_intercepted", {"user": user_id, "amount": amount})

        if amount >= 40000:
            result = self.trigger_factoring(user_id, amount)
            if result["success"]: return {"recovery": result, "audit": self.audit_trail}
            result = self.trigger_split_tender(user_id, amount)
            return {"recovery": result, "audit": self.audit_trail}
        elif 4000 <= amount < 40000:
            return {"recovery": self.trigger_split_tender(user_id, amount), "audit": self.audit_trail}
        else:
            return {"recovery": self.trigger_data_for_debt(user_id, amount), "audit": self.audit_trail}
