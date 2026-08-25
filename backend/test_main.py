from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    """Test if the backend server is running correctly."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "success", "message": "The Liquid Checkout Backend is Running!"}

def test_recover_endpoint_validation():
    """Test if the AI orchestrator correctly requires parameters."""
    response = client.post("/recover")
    assert response.status_code == 422  # Unprocessable Entity (Missing params)
