from django import forms

class UploadFileForm(forms.Form):
    first_file = forms.FileField()
    second_file = forms.FileField()