import copy
from django.core.exceptions import ValidationError
import magic

def validate_text_file(file_buffer):

    # Validating a copy of the buffer ensures the whole file is retained
    validation_buffer = copy.deepcopy(file_buffer)

    magic_app = magic.Magic()
    mime_type = magic_app.from_buffer(validation_buffer.read(1024))
    print(mime_type)
    valid_mime_types = ['ASCII text', 'Unicode text']
    if any(valid_type in mime_type for valid_type in valid_mime_types):
        return file_buffer
    else:
        raise ValidationError("Invalid file type")