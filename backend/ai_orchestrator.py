# DEPRECATED: Logic moved to recovery_service.py for modularity
from recovery_service import RecoveryService

svc = RecoveryService()

def recover(user_id: str, amount: float):
    return svc.recover(user_id, amount)