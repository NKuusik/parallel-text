from django import forms

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    first_file = forms.FileField()
    second_file = forms.FileField()