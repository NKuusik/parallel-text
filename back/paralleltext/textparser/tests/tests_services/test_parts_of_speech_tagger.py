"""
Test PartsOfSpeechTagger
"""

from django.test import TestCase
import nltk
from ...services.parts_of_speech_tagger import PartsOfSpeechTagger

tagger = PartsOfSpeechTagger()

class PartsOfSpeechTaggerTestCase(TestCase):
    """
    Tests for PartsOfSpeechTaggerTestCase service
    
    Note that we do not actually test language identification in these tests
    """
    def setUp(self):
        """
        Set up.
        """

    def tearDown(self):
        """
        Tear down.
        """

    def test_english_text_tags_correctly(self):
        """
        Input text in English is tagged correctly.
        """

        test_text_list = ["This is the first test text", "This is another test text"]
        tagged_lines = tagger.tag_several_lines(test_text_list, 'en')

        for result, test_text in zip(tagged_lines, test_text_list):
            tokenized_words = nltk.word_tokenize(test_text)
            self.assertEqual(result, nltk.pos_tag(tokenized_words))

    def test_other_languages_are_not_tagged(self):
        """
        Input text in any other language is not tagged.
        """

        test_text_list = ["See on mingis muus keeles."]
        tagged_lines = tagger.tag_several_lines(test_text_list, 'et')
        self.assertEqual(tagged_lines, None)

        tagged_lines = tagger.tag_several_lines(test_text_list, 'ge')
        self.assertEqual(tagged_lines, None)

        tagged_lines = tagger.tag_several_lines(test_text_list, 'fr')
        self.assertEqual(tagged_lines, None)
