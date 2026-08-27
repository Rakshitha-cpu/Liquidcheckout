from database import SessionLocal, PaymentSession
import random
import datetime

db = SessionLocal()

items = ["MacBook Pro", "Nike Air Force", "Netflix Sub", "Sony Headphones", "Office Chair"]

# Generate 35 fake transactions
for i in range(35):
    amount = random.randint(1200, 100000)
    
    if amount >= 40000:
        method = "factoring"
        item = "MacBook Pro"
    elif amount >= 4000:
        method = "split_tender"
        item = random.choice(["Nike Air Force", "Sony Headphones", "Office Chair"])
    else:
        method = "data_for_debt"
        item = "Netflix Sub"
        
    # 85% success rate for AI
    is_success = random.random() > 0.15
    recovered = 0
    
    if is_success:
        if method == "factoring":
            recovered = amount * 0.95 # Merchant gets 95%
        else:
            recovered = amount
            
    # Random timestamps over the last 5 hours
    ts = datetime.datetime.utcnow() - datetime.timedelta(minutes=random.randint(1, 300))
    
    sess = PaymentSession(
        user_id=f"U1{i:03d}",
        item=item,
        amount=float(amount),
        method=method,
        recovered=float(recovered),
        status="success" if is_success else "failed",
        timestamp=ts
    )
    db.add(sess)

db.commit()
db.close()
print("Successfully seeded the database with 35 realistic AI interception logs!")
