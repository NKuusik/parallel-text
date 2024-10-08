"""
Forms.
"""

from django import forms
from django.core.validators import FileExtensionValidator
from .validators import validate_text_file

class UploadFileForm(forms.Form):
    """
    Upload file Form.

    Handles form input from the client.
    """
    first_file = forms.FileField(validators=[FileExtensionValidator(allowed_extensions=['txt']),
                                            validate_text_file])
    second_file = forms.FileField(validators=[FileExtensionValidator(allowed_extensions=['txt']),
                                            validate_text_file])
