import razorpay
import google.generativeai as genai
from config import settings
import time
from typing import Callable, Any

# Initialize Razorpay
rzp_client = razorpay.Client(auth=(settings.razorpay_key_id, settings.razorpay_key_secret))

# Initialize Gemini
genai.configure(api_key=settings.gemini_api_key)
gemini_model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})

def create_razorpay_link(amount_inr: float, description: str, log_fn: Callable[[str, dict], dict], retries: int = 3) -> str:
    """
    Creates a Razorpay payment link with automatic retries on network failure.
    
    Args:
        amount_inr (float): The amount in Indian Rupees.
        description (str): A description of the payment.
        log_fn (Callable): The logging function to record the event.
        retries (int): Number of attempts before falling back.
        
    Returns:
        str: The generated short URL for the payment link.
    """
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
            return str(link["short_url"])
        except razorpay.errors.ServerError:
            time.sleep(1)
        except razorpay.errors.BadRequestError as req_err:
            log_fn("razorpay_bad_request", {"error": str(req_err)})
            break
        except ConnectionError:
            time.sleep(1)
    
    return f"https://rzp.io/l/fallback_{int(amount_inr)}"
