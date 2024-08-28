"""
DifferenceIdentifier.
"""
import itertools

class DifferenceIdentifier:
    """
    Compare input strings and identifies which strings are identical, which different.
    """
    def __init__(self):
        pass

    def compare_strings(self, first_string, second_string):
        """
        Compare input strings and identify which strings are identical, which different.
        Return a nested list of strings alternating between identical and different strings
        """
        output = []
        identical_string = ""
        different_string1 = ""
        different_string2 = ""
        for x, y in itertools.zip_longest(first_string, second_string, fillvalue=""):
            if x == y:
                if different_string1 != "" and different_string2 != "":
                    output.append([different_string1, different_string2])
                    different_string1 = ""
                    different_string2 = ""
                identical_string += x
            else:
                if identical_string != "":
                    output.append([identical_string])
                    identical_string = ""
                different_string1 += x
                different_string2 += y
        if identical_string != "":
            output.append(identical_string)
        elif different_string1 != "" and different_string2 != "":
            output.append([different_string1, different_string2])
        return output
