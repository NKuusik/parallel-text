from django.urls import path, include

from . import views

urlpatterns = [
    path("text/", views.Text.as_view())
]
