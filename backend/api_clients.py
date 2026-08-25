import razorpay
import google.generativeai as genai
from config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, GEMINI_API_KEY, CALLBACK_URL
import time

# Initialize APIs
rzp_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

def create_razorpay_link(amount_inr: float, description: str, log_fn, retries: int = 3):
    for attempt in range(retries):
        try:
            link = rzp_client.payment_link.create({
                "amount": int(amount_inr * 100),
                "currency": "INR",
                "description": description,
                "callback_url": CALLBACK_URL,
                "callback_method": "get"
            })
            log_fn("razorpay_link_created", {"amount": amount_inr, "url": link["short_url"]})
            return link["short_url"]
        except Exception as e:
            time.sleep(1)
    return f"https://rzp.io/l/fallback_{int(amount_inr)}"
