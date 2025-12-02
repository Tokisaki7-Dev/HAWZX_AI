from datetime import datetime
from enum import Enum

class UserRole(Enum):
    ADMIN = 'admin'
    USER = 'user'
    GUEST = 'guest'

class User:
    def __init__(self, id, username, email, role=UserRole.USER):
        self.id = id
        self.username = username
        self.email = email
        self.role = role
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

class Project:
    def __init__(self, id, name, description='', owner_id=None):
        self.id = id
        self.name = name
        self.description = description
        self.owner_id = owner_id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.status = 'active'

class Task:
    def __init__(self, id, title, description='', project_id=None, status='pending'):
        self.id = id
        self.title = title
        self.description = description
        self.project_id = project_id
        self.status = status
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.priority = 'medium'

class Response:
    def __init__(self, success=True, message='', data=None, status_code=200):
        self.success = success
        self.message = message
        self.data = data
        self.status_code = status_code
    
    def to_dict(self):
        return {
            'success': self.success,
            'message': self.message,
            'data': self.data
        }
