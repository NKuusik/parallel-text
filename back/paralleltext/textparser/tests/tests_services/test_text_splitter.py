"""
Test services
"""
from django.test import TestCase
from ...services.text_splitter import TextSplitter
from ...exceptions import InvalidParamValueError

class TextSplitterTestCase(TestCase):
    """
    Tests for TextSplitter service view
    """
    def setUp(self):
        """
        Set up.
        """
        self.text = None
        with open('./textparser/tests/test_text.txt', encoding="utf-8") as file:
            self.text = file.read()

    def tearDown(self):
        """
        Tear down.
        """

    def test_sentence_param_value(self):
        """
        Test valid input data.
        """
        text_splitter = TextSplitter()
        separated_sentences = text_splitter.split_text(self.text, 'sentence')
        valid_sentences = ['Tere!',
                            'See on testtekst, kus leidub erineval kujul vormistust.',
                            'Esiteks, see on lause, mis lõpeb punktiga.',
                            'Kas see on lause, mis lõpeb küsimusega?',
                            'Mitu uut rida peaks taanduma!',
                            'Otsekõne on raske: "Kas otsekõne on tõesti raske?"',
                            'Noh, ma usun küll, eks vaatame.',
                            '"Samas, mis saab siis, kui lause algab otsekõnega!"', 
                            'ei oska me arvata.',
                            'See rida algab taandreaga.',
                            'Selles lauses on palju tühja vahel.',
                            'Kõige lõpus veel veidraid tühimikke?!.',
                            'Aga mõnikord väljendab punkt hoopis lühendamist, i.e.',
                            'this is an abbrevation in English.']
        for (test_sentence, valid_sentence) in zip(separated_sentences, valid_sentences):
            self.assertEqual(test_sentence, valid_sentence)

    def test_invalid_param_value(self):
        """
        Test invalid param value raises error.
        """
        text_splitter = TextSplitter()
        with self.assertRaises(InvalidParamValueError):
            text_splitter.split_text(self.text, 'some_param_value')
