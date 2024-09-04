"""
Views.
"""
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import JsonResponse
from auth.custom_permissions import WhitelistPermission
from .forms import UploadFileForm
from .services.text_splitter import TextSplitter
from .services.difference_identifier import DifferenceIdentifier
from .services.language_identifier import LanguageIdentifier
from .services.parts_of_speech_tagger import PartsOfSpeechTagger

from .exceptions import InvalidParamValueError

logger = logging.getLogger("paralleltext.views")
difference_identifier = DifferenceIdentifier()
language_identifier = LanguageIdentifier()
pos_tagger = PartsOfSpeechTagger()
text_splitter = TextSplitter()

class Text(APIView):
    """
    API View for Text
    """

    permission_classes = (WhitelistPermission,)

    # Todo: either create a serializer class for Text or import schema from UploadFileForm
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'delim', 
                openapi.IN_QUERY,
                description="Determine which delimiter to use",
                type=openapi.TYPE_STRING,
                enum=['sentence', 'newline'],  # Allowed values
            ),
        ],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'first_file': openapi.Schema(
                    type=openapi.TYPE_FILE,
                    description='First file'
                    ),
                'second_file': openapi.Schema(
                    type=openapi.TYPE_FILE,
                    description='Second file'
                    )
            },
            required=['first_file', 'second_file'],
        ),
        responses={200: 'Success',
                   422: 'Unprocessable entity'},
    )
    def post(self, request):
        """
        Handle post requests.
        """
        file_dict = {
            "first_file": {},
            "second_file": {},
            "comparison": None,
                    }
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            param_value = request.GET.get('delim')

            for key in request.FILES:
                file = request.FILES[key]
                # Todo: consider using dataclass or Model?
                file_dict[key] = {
                    "title": file.name,
                    "lines": {
                        "raw": [],
                        "pos": []
                        },
                    "language": None
                }
                text = file.read().decode("utf-8")
                try:
                    identified_language = language_identifier.identify_language(text)
                    lines = text_splitter.split_text(text, param_value)

                    file_dict[key]["language"] = identified_language
                    file_dict[key]['lines']["raw"] = lines
                    tagged_lines = pos_tagger.tag_several_lines(lines, identified_language)
                    file_dict[key]["lines"]["pos"] = tagged_lines
                except InvalidParamValueError:
                    error_message = "Invalid param value submitted"
                    logger.warning("%s:%s", error_message, param_value)
                    return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            compared_text = []
            for line1, line2 in zip(file_dict["first_file"]["lines"],
                                    file_dict["second_file"]["lines"]):
                compared_text.append(difference_identifier.compare_strings(line1, line2))
            file_dict["comparison"] = compared_text
            return JsonResponse(file_dict)
        error_message = "Invalid data submitted"
        logger.warning("%s:%s", error_message, list((form.errors.values())))
        return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
