from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from .forms import UploadFileForm
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import logging

logger = logging.getLogger("paralleltext.views")

@api_view(['POST'])
@csrf_exempt
def index(request):
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
    else:
        error_message = "Invalid data submitted"
        logger.warning(f'{error_message}: {list((form.errors.values()))}')
        return Response(error_message, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
