from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class RecoveryRequest(BaseModel):
    user_id: str
    amount: float
