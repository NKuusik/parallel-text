from django.db import models


class Text(models.Model):
    title = models.CharField(max_length=200)

class Line(models.Model):
    text = models.ForeignKey(Text, on_delete=models.CASCADE)
    line_contents = models.CharField(max_length=400)
    number = models.IntegerField(default=0)

    class Meta:
        unique_together = ['text', 'number']