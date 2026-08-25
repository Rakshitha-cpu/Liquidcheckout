from fastapi.testclient import TestClient
from main import app
import pytest
from unittest.mock import patch, MagicMock

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Liquid Checkout Backend Running"}

@patch('recovery_service.RecoveryService.trigger_factoring')
def test_recover_factoring(mock_factoring):
    mock_factoring.return_value = {"success": True, "method": "factoring"}
    response = client.post("/recover?user_id=U101&amount=96000")
    assert response.status_code == 200
    assert response.json()["recovery"]["method"] == "factoring"

@patch('recovery_service.RecoveryService.trigger_split_tender')
def test_recover_split_tender(mock_split):
    mock_split.return_value = {"success": True, "method": "split_tender"}
    response = client.post("/recover?user_id=U101&amount=12000")
    assert response.status_code == 200
    assert response.json()["recovery"]["method"] == "split_tender"

@patch('recovery_service.RecoveryService.trigger_data_for_debt')
def test_recover_data_for_debt(mock_data):
    mock_data.return_value = {"success": True, "method": "data_for_debt"}
    response = client.post("/recover?user_id=U101&amount=1200")
    assert response.status_code == 200
    assert response.json()["recovery"]["method"] == "data_for_debt"
