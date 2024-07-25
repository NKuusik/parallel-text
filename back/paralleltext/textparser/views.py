from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse
from .forms import UploadFileForm

@csrf_exempt
def index(request):

    if request.method == 'POST':
        return(HttpResponse(request.FILES))
    else:
        return HttpResponse("Boo")