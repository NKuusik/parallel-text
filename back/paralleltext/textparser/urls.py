from django.urls import path, include

from . import views
"""
urlpatterns = [
    path("text/", include("textparser.urls")),
]
"""


urlpatterns = [
    path("", views.index, name="index"),
]
