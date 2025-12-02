import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json['status'] == 'ok'

def test_version(client):
    response = client.get('/api/version')
    assert response.status_code == 200
    assert 'version' in response.json
