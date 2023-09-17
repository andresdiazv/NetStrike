import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_light_scan(self):
        response = self.app.post('/api/light-scan', json={"ip": "127.0.0.1"})
        self.assertEqual(response.status_code, 200)
        # Add more checks to validate the scan result
