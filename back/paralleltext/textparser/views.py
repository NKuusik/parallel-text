from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse, JsonResponse
from .forms import UploadFileForm
import json

@csrf_exempt
def index(request):

    if request.method == 'POST':
        file_dict = {
            "first_file": {},
            "second_file": {}
                     }
        for key in request.FILES:
            file = request.FILES[key]
            file_dict[key] = {
                "title": file.name
            }
            lines = file.readlines()
            for line in lines:
                pass            
        return JsonResponse(file_dict)
    else:
        return HttpResponse("Boo")