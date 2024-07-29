from django.core.exceptions import ValidationError
import magic

def validate_text_file(file_buffer):

    magic_app = magic.Magic()
    mime_type = magic_app.from_buffer(file_buffer.read(2048))
    if "Unicode text, UTF-8 text" in mime_type:
        return file_buffer
    else:
        raise ValidationError("Invalid file type")