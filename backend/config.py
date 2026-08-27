from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    razorpay_key_id: str = "rzp_test_mock_key_123"
    razorpay_key_secret: str = "rzp_test_mock_secret_456"
    gemini_api_key: str = "AIzaSy_mock_gemini_key_789"
    
    class Config:
        env_file = ".env"

settings = Settings()
