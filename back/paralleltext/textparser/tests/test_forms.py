from django.test import TestCase
from ..forms import UploadFileForm
from django.core.files.uploadedfile import SimpleUploadedFile

class UploadFileFormTestCase(TestCase):

    def test_form_is_valid(self):
        file1 = SimpleUploadedFile('file1.txt', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        form = UploadFileForm(files={'first_file': file1, 'second_file': file2})
        self.assertTrue(form.is_valid())

    def test_form_incorrect_file_extension(self):
        file1 = SimpleUploadedFile('file1.exe', b"I am a test file 1", content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="text/plain")
        form = UploadFileForm(files={'first_file': file1, 'second_file': file2})
        self.assertFalse(form.is_valid())
    
    def test_form_incorrect_JSON(self):
        file1 = SimpleUploadedFile('file1.txt', b'{"jsonObject": {"isJSON": true}}', content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b"I am a test file 2", content_type="application/x-custom")
        form = UploadFileForm(files={'first_file': file1, 'second_file': file2})
        self.assertFalse(form.is_valid())

    def test_form_incorrect_bash(self):
        file1 = SimpleUploadedFile('file1.txt', b'I am a test file 1', content_type="text/plain")
        file2 = SimpleUploadedFile('file2.txt', b'#!/bin/bash\necho "Hello World"', content_type="application/x-custom")
        form = UploadFileForm(files={'first_file': file1, 'second_file': file2})
        self.assertFalse(form.is_valid())