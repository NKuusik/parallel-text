"""
Apps
"""

from django.apps import AppConfig

class TextparserConfig(AppConfig):
    """
    TextparserConfig
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'textparser'
    def ready(self) -> None:
        nltk.download('punkt')
        nltk.download('punkt_tab')
        nltk.download('averaged_perceptron_tagger_eng')
        return super().ready()
