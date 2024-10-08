"""
PartsOfSpeechTagger
"""
import nltk

class PartsOfSpeechTagger:
    """
    Detect language of an input text.
    """
    def __init__(self):
        pass

    def tag_single_line(self, input_text, language):
        """
        Provide PoS tags for input text if language is English.
        Return None otherwise
        """
        if language == 'en':
            tokenized_words = nltk.word_tokenize(input_text)
            return nltk.pos_tag(tokenized_words)
        return None

    def tag_several_lines(self, lines, language):
        """
        Provide PoS tags for a list of input text if language is English.
        Return None otherwise
        """
        if language == 'en':
            tagged_lines = []
            for line in lines:
                tagged_lines.append(self.tag_single_line(line, language))
            return tagged_lines
        return None
