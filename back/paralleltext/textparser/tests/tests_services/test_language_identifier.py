"""
Test LanguageIdentifier
"""
from django.test import TestCase
from ...services.language_identifier import LanguageIdentifier

identifier = LanguageIdentifier()

class LanguageIdentifierTestCase(TestCase):
    """
    Tests for LanguageIdentifier service
    """
    def setUp(self):
        """
        Set up.
        """

    def tearDown(self):
        """
        Tear down.
        """

    def test_text_in_one_language_correctly_identified(self):
        """
        Text in one language is correctly identified.
        """
        test_text_en = ("Whereas it is essential to promote the development"
                        "of friendly relations between nations")
        language_en = identifier.identify_language(test_text_en)
        self.assertEqual(language_en, 'en')

        test_text_fr = ("Considérant qu’il est essentiel d’encourager"
                        "le développement de relations amicales entre nations")
        language_fr = identifier.identify_language(test_text_fr)
        self.assertEqual(language_fr, 'fr')

        test_text_de = ("da es notwendig ist, die Entwicklung freundschaftlicher"
                        "Beziehungen zwischen den Nationen zu fördern")
        language_de = identifier.identify_language(test_text_de)
        self.assertEqual(language_de, 'de')

        test_text_et = ("pidades silmas, et on vaja kaasa aidata sõbralike"
                        "suhete arendamisele rahvaste vahel ja;")
        language_et = identifier.identify_language(test_text_et)
        self.assertEqual(language_et, 'et')

        test_text_ru = ("принимая во внимание, что необходимо содействовать"
                        "развитию дружественных отношений между народами; и")
        language_ru = identifier.identify_language(test_text_ru)
        self.assertEqual(language_ru, 'ru')


    def test_text_in_several_languages_unknown(self):
        """
        Text consisting of several languages is undefined
        """
        test_text_en_fr_de = ("Whereas qu’il est essentiel d’encourager "
        "le développement дружественных Beziehungen между den Nationen zu fördern")
        language_en_fr_de = identifier.identify_language(test_text_en_fr_de)
        self.assertEqual(language_en_fr_de, 'und')

        test_text_et_ru_de = ("pidades silmas, die Entwicklung "
                              "freundschaftlicher дружественных отношений между народами;")
        language_et_ru_de = identifier.identify_language(test_text_et_ru_de)
        self.assertEqual(language_et_ru_de, 'und')

