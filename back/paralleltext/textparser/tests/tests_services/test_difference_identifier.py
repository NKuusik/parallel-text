"""
Test services
"""
from django.test import TestCase
from ...services.difference_identifier import DifferenceIdentifier

class DifferenceIdentifierTestCase(TestCase):
    """
    Tests for DifferenceIdentifier service
    """
    def setUp(self):
        """
        Set up.
        """

    def tearDown(self):
        """
        Tear down.
        """

    def test_identical_strings(self):
        """
        Comparing string with itself provides complete similarity.
        """
        test_text = "This is a test text"
        difference_identifier = DifferenceIdentifier()
        analysed_text = difference_identifier.compare_strings(test_text, test_text)
        self.assertEqual(len(analysed_text), 1)
        self.assertEqual(analysed_text[0][0], test_text)

    def test_completely_different_strings(self):
        """
        Comparing completely different strings provides complete difference.
        """
        first_text = "abcdefgh"
        second_text = "hgfedcba"
        difference_identifier = DifferenceIdentifier()
        analysed_text = difference_identifier.compare_strings(first_text, second_text)
        self.assertEqual(len(analysed_text), 1)
        self.assertEqual(analysed_text[0][0], first_text)
        self.assertEqual(analysed_text[0][1], second_text)

    def test_partially_different_strings_equal_length(self):
        """
        Comparing equal-length partially different strings 
        identifies the identical and different parts of the string.
        """
        first_text = "This is the first test text."
        second_text = "This is the other test text!"
        difference_identifier = DifferenceIdentifier()
        analysed_text = difference_identifier.compare_strings(first_text, second_text)
        self.assertEqual(len(analysed_text), 4)
        self.assertEqual(analysed_text[0][0], 'This is the ')
        self.assertEqual(analysed_text[1][0], 'first')
        self.assertEqual(analysed_text[1][1], 'other')
        self.assertEqual(analysed_text[2][0], ' test text')
        self.assertEqual(analysed_text[3][0], '.')
        self.assertEqual(analysed_text[3][1], '!')

    def test_partially_different_strings_different_length(self):
        """
        Comparing unequal-length partially different strings 
        identifies the identical and different parts of the string.
        """
        first_text = "This is the first test text."
        second_text = "This is the second test text."
        difference_identifier = DifferenceIdentifier()
        analysed_text = difference_identifier.compare_strings(first_text, second_text)
        self.assertEqual(len(analysed_text), 2)
        self.assertEqual(analysed_text[0][0], 'This is the ')
        self.assertEqual(analysed_text[1][0], 'first test text.')
        self.assertEqual(analysed_text[1][1], 'second test text.')
