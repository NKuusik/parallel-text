"""
Views.
"""
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from auth.custom_permissions import WhitelistPermission
from .forms import UploadFileForm
from .services.text_splitter import TextSplitter
from .services.difference_identifier import DifferenceIdentifier
from .exceptions import InvalidParamValueError


logger = logging.getLogger("paralleltext.views")

class Text(APIView):
    """
    API View for Text
    """
    permission_classes = (WhitelistPermission,)
    def post(self, request):
        """
        Handle post requests.
        """
        file_dict = {
            "first_file": {},
            "second_file": {},
            "comparison": None
                    }
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            param_value = request.GET.get('delim')
            text_splitter = TextSplitter(param_value)
            difference_identifier = DifferenceIdentifier()

            for key in request.FILES:
                file = request.FILES[key]

                file_dict[key] = {
                    "title": file.name,
                    "lines": []
                }
                text = file.read().decode("utf-8")
                try:
                    file_dict[key]['lines'] = text_splitter.split_text(text)
                except InvalidParamValueError:
                    error_message = "Invalid param value submitted"
                    logger.warning("%s:%s", error_message, param_value)
                    return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            compared_text = []
            for line1, line2 in zip(file_dict["first_file"]["lines"],
                                    file_dict["second_file"]["lines"]):
                analysed_list = difference_identifier.compare_strings(line1, line2)
                compared_text.append(analysed_list)
            file_dict["comparison"] = compared_text
            return JsonResponse(file_dict)
        error_message = "Invalid data submitted"
        logger.warning("%s:%s", error_message, list((form.errors.values())))
        return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
