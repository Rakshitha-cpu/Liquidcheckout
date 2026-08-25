import os
from dotenv import load_dotenv

load_dotenv()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CALLBACK_URL = os.getenv("CALLBACK_URL", "http://localhost:3000/success")
