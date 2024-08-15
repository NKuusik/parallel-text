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


logger = logging.getLogger("paralleltext.views")

class Text(APIView):
    """
    API View for Text
    """
    permission_classes = (WhitelistPermission,)
    def post(self, request, format=None):
        """
        Handle post requests.
        """
        file_dict = {
            "first_file": {},
            "second_file": {}
                     }
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            for key in request.FILES:
                file = request.FILES[key]

                file_dict[key] = {
                    "title": file.name,
                    "lines": []
                }

                lines = file.readlines()
                for line in lines:
                    decoded_line = line.decode("utf-8")
                    stripped_line = decoded_line.rstrip()
                    file_dict[key]['lines'].append(stripped_line)
            return JsonResponse(file_dict)
        error_message = "Invalid data submitted"
        logger.warning("%s:%s", error_message, list((form.errors.values())))
        return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
