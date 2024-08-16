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
            separator = request.GET.get('delim')
            if separator == 'newline' or separator is None:
                separator = '\n'
            for key in request.FILES:
                file = request.FILES[key]

                file_dict[key] = {
                    "title": file.name,
                    "lines": []
                }
                text = file.read().decode("utf-8")
                lines = text.split(separator)
                stripped_lines = []
                # Restore the separator to the end of if it is not newline
                for x in range(len(lines)):
                    current_line = lines[x]
                    if current_line != '':
                        if x < len(lines) - 1:
                            current_line += separator
                        current_line = current_line.strip()
                        current_line = current_line.replace('\n', ' ')
                        stripped_lines.append(current_line)
                file_dict[key]['lines'] = stripped_lines

            return JsonResponse(file_dict)
        error_message = "Invalid data submitted"
        logger.warning("%s:%s", error_message, list((form.errors.values())))
        return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
