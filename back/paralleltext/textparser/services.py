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
        lines = None
        sentence_terminators = []
        if self.__param_value == 'sentence':
            prepended_terminators = []
            sentence_terminators = ['.','?', '!', '\n']
            for terminator in sentence_terminators:
                if terminator != '\n':
                    prepended_terminators.append('\\' + terminator)
                else:
                    prepended_terminators.append(terminator)
            re_expression_part = '["\'”“’»]?|'.join(prepended_terminators)
            re_full_pattern = r'(' + re_expression_part + ')'
            lines = re.split(re_full_pattern, text)

        elif self.__param_value == 'newline' or self.__param_value is None:
            lines = text.split('\n')
        else:
            raise InvalidParamValueError('Invalid parameter value provided for splitting text')
        stripped_lines = []
        previous_line = None
        #print(re_expression_part)
        for x in range(len(lines)):
            current_line = lines[x]
            #print(f'current_line 1 {current_line}')
            if not current_line.isspace() and current_line != "":
                #print(f'current_line 2 {current_line}')
                current_line = current_line.strip()
                current_line = current_line.replace('\n', ' ')
#
                if len(stripped_lines) > 0 and \
                    (
                        any(terminator in sentence_terminators for terminator in current_line) \
                        or len(current_line) < self.__MINIMUM_SENTENCE_LENGTH
                    ):
                    #print(f'current_line 3 {current_line}')
                #current_line in sentence_terminators:
                    previous_line += current_line
                    # Add index check here to prevent errors when text starts with a terminator
                    stripped_lines[-1] = previous_line
                else:
                    #print(f'current_line 4 {current_line}')
                    stripped_lines.append(current_line)
                    previous_line = current_line
        return stripped_lines