"""
Services.
"""
import re
from .exceptions import InvalidParamValueError

class TextSplitter:
    def __init__(self, param_value):
        self.__param_value = param_value
        self.__MINIMUM_SENTENCE_LENGTH = 3


    def split_text(self, text):
        """
        Split text into list of lines depending on the param_value
        """
        raw_lines = None
        sentence_terminators = []
        if self.__param_value == 'sentence':
            sentence_terminators = ['.','?', '!', '\n']
            new_pattern = self.__provide_sentence_termination_regex(sentence_terminators)
            raw_lines = re.split(new_pattern, text)

        elif self.__param_value == 'newline' or self.__param_value is None:
            raw_lines = text.split('\n')
        else:
            raise InvalidParamValueError('Invalid parameter value provided for splitting text')
        return self.__clean_raw_line_data(sentence_terminators, raw_lines)
    
    def __provide_sentence_termination_regex(self, sentence_terminators):
        """
        Generate the regex for identifying sentence end.
        A sentence ends with one of the sentence terminators which may be followed by one of the quotation marks.
        """
        prepended_terminators = []
        quotation_marks = '"\'”“’»'

        for terminator in sentence_terminators:
            if terminator != '\n':
                prepended_terminators.append('\\' + terminator)
            else:
                prepended_terminators.append(terminator)
        re_expression_part = f'[{quotation_marks}]?|'.join(prepended_terminators)
        full_pattern = r'(' + re_expression_part + ')'
        return full_pattern
    
    def __clean_raw_line_data(self, sentence_terminators, raw_lines):
        """
        1) Clean lines split by regex from any noise.
        Noise is 
            - any line that is empty or only consists whitespace of any kind.
            - any newline symbol
            - excessive whitespace of any kind inside the string

        2) Append any line that has a sentence terminator to the previous line except for the first line.
        3) Append any line below the MINIMUM_SENTENCE_LENGTH to the previous line except for the first line.
        """
        cleaned_lines = []
        previous_line = None
        for x in range(len(raw_lines)):
            current_line = raw_lines[x]
            if not current_line.isspace() and current_line != "":
                current_line = current_line.replace('\n', ' ')
                if len(cleaned_lines) > 0 and \
                    (
                        any(terminator in sentence_terminators for terminator in current_line) \
                        or len(current_line) < self.__MINIMUM_SENTENCE_LENGTH
                    ):
                    previous_line += current_line
                    cleaned_lines[-1] = previous_line
                else:
                    current_line = current_line.strip()
                    current_line = ' '.join(current_line.split())
                    cleaned_lines.append(current_line)
                    previous_line = current_line
        return cleaned_lines