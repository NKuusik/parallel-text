from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ValidationError
from .forms import UploadFileForm
import logging

logger = logging.getLogger("paralleltext.views")

@csrf_exempt
def index(request):
    print("NOW printing request")
    print(request)

    if request.method == 'POST':
        file_dict = {
            "first_file": {},
            "second_file": {}
                     }
        form = UploadFileForm(request.POST, request.FILES)
        print(form)
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
            print(file_dict)
            return JsonResponse(file_dict)
        else:
            error_message = "Invalid data submitted"
            logger.warning(f'{error_message}: {list((form.errors.values()))}')
            return HttpResponse(error_message)
    else:
        return HttpResponseNotAllowed(request)