from rest_framework.test import APIClient
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
import json

class TextViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        settings.DEBUG = True

    def tearDown(self):
        settings.DEBUG = False

    def test_valid_data_posted(self):

        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2}, format=None)
        self.assertEqual(200, response.status_code)
        json_as_dict = json.loads(response.content)
        self.assertEqual(json_as_dict['first_file']['title'], 'file1.txt')
        self.assertEqual(json_as_dict['first_file']['lines'], ['I am a test file 1'])
        self.assertEqual(json_as_dict['second_file']['title'], 'file2.txt')
        self.assertEqual(json_as_dict['second_file']['lines'], ['I am a test file 2'])

    def test_invalid_data_posted_incorrect_file_extension(self):
        file1 = SimpleUploadedFile('file1.exe', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2}, format=None)
        self.assertEqual(422, response.status_code)

    def test_client_whitelisted_origin(self):
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2}, HTTP_ORIGIN='127.0.0.1')
        self.assertEqual(200, response.status_code)

    def test_client_whitelisted_referer(self):
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2}, HTTP_REFERER='127.0.0.1')
        self.assertEqual(200, response.status_code)

    def test_client_not_whitelisted(self):
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2}, HTTP_ORIGIN='somedomain.com')
        self.assertEqual(403, response.status_code)