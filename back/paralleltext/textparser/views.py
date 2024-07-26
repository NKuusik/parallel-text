from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse, JsonResponse
from .forms import UploadFileForm

@csrf_exempt
def index(request):

    if request.method == 'POST':
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
        return HttpResponse("File not valid")
    else:
        return HttpResponse("Boo")