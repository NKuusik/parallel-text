"""
LanguageIdentifier
"""
import gcld3

class LanguageIdentifier:
    
    """
    Detect language of an input text.
    """
    def __init__(self):
        pass

    def identify_language(self, input_text):
        language_identifier = gcld3.NNetLanguageIdentifier(min_num_bytes=0,                                                          max_num_bytes=1000000)        
        identified_language = language_identifier.FindLanguage(text=input_text)

        if identified_language.probability > 0.9:
            return identified_language.language
        return 'und'
