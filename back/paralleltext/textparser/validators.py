import copy
from django.core.exceptions import ValidationError
import magic

def validate_text_file(file_buffer):

    # Validating a copy of the buffer ensures the whole file is retained
    validation_buffer = copy.deepcopy(file_buffer)
    magic_app = magic.Magic()
    mime_type = magic_app.from_buffer(validation_buffer.read(1024))
    allowed_mime_type_elements = ['ASCII text', 'Unicode text']
    forbidden_mime_type_elements = ['executable', 'shell', 'script']
    if any(valid_type in mime_type for valid_type in allowed_mime_type_elements) \
        and not(any(forbidden_type in mime_type for forbidden_type in forbidden_mime_type_elements)):
        return file_buffer
    else:
        raise ValidationError("Invalid file type")