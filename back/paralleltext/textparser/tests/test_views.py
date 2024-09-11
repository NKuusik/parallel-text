"""
Test views
"""
import json

from rest_framework.test import APIClient
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings

class TextViewTestCase(TestCase):
    """
    Tests for Text view
    """
    def setUp(self):
        """
        Set up.
        """
        self.client = APIClient()
        settings.DEBUG = True

    def tearDown(self):
        """
        Tear down.
        """
        settings.DEBUG = False

    def test_valid_data_posted(self):
        """
        Test valid input data.
        """

        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2},
                                    format=None)
        self.assertEqual(200, response.status_code)
        json_as_dict = json.loads(response.content)
        self.assertEqual(json_as_dict['first_file']['title'], 'file1.txt')
        self.assertEqual(json_as_dict['first_file']['lines']["raw"], ['I am a test file 1'])
        self.assertEqual(json_as_dict['second_file']['title'], 'file2.txt')
        self.assertEqual(json_as_dict['second_file']['lines']["raw"], ['I am a test file 2'])

    def test_invalid_data_posted_incorrect_file_extension(self):
        """
        Test invalid input data where input file has incorrect file extension.
        """
        file1 = SimpleUploadedFile('file1.exe', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2},
                                    format=None)
        self.assertEqual(422, response.status_code)

    def test_client_whitelisted_origin(self):
        """
        Test whether request is successful when HTTP_ORIGIN is whitelisted.
        """
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2},
                                    HTTP_ORIGIN='127.0.0.1')
        self.assertEqual(200, response.status_code)

    def test_client_whitelisted_referer(self):
        """
        Test whether request is successful when HTTP_REFERER is whitelisted.
        """
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2},
                                    HTTP_REFERER='127.0.0.1')
        self.assertEqual(200, response.status_code)

    def test_client_not_whitelisted(self):
        """
        Test whether request fails when client is not whitelisted.
        """
        settings.DEBUG = False
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/', {'first_file': file1, 'second_file': file2},
                                    HTTP_ORIGIN='somedomain.com')
        self.assertEqual(403, response.status_code)

    def test_invalid_param_value(self):
        """
        Test whether request fails when delimiter is provide as param value.
        """
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        response = self.client.post('/api/text/?delim=somevalue', {'first_file': file1,
                                                                   'second_file': file2},
                                    format=None)
        self.assertEqual(422, response.status_code)
