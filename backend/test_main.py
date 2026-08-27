from fastapi.testclient import TestClient
from main import app
import pytest
from unittest.mock import patch, MagicMock

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200

@patch('recovery_service.RecoveryService.trigger_factoring')
def test_recover_factoring_success(mock_factoring):
    mock_factoring.return_value = {"success": True, "method": "factoring"}
    response = client.post("/recover?user_id=U101&amount=96000")
    assert response.status_code == 200
    assert response.json()["recovery"]["method"] == "factoring"

@patch('recovery_service.RecoveryService.trigger_factoring')
@patch('recovery_service.RecoveryService.trigger_split_tender')
def test_recover_factoring_failure_fallback(mock_split, mock_factoring):
    # Test Edge Case: If factoring fails, it should fallback to split_tender
    mock_factoring.return_value = {"success": False}
    mock_split.return_value = {"success": True, "method": "split_tender"}
    response = client.post("/recover?user_id=U101&amount=96000")
    assert response.status_code == 200
    assert response.json()["recovery"]["method"] == "split_tender"

def test_recover_invalid_amount():
    # Test Failure Scenario: Invalid input type
    response = client.post("/recover?user_id=U101&amount=invalid_string")
    assert response.status_code == 422 # Validation Error
