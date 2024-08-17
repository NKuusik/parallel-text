"""
Services.
"""
import re
from .exceptions import InvalidParamValueError

class TextSplitter:
    def __init__(self, param_value):
        self.__param_value = param_value

    def split_text(self, text):
        """
        Split text into list of lines depending on the param_value
        """
        lines = None
        sentence_terminators = []
        if self.__param_value == 'sentence':
            # How to handle quotation marks of any type?
            sentence_terminators = ['.','?', '!']
            # Replace hard-coded value with variable using .join('|')
            # Consider adding \n to regular expresison
            lines = re.split('([.|?|!])', text)
        # Todo: explicitly check for the value to be either 'newline' or 'sentence'
        # and raise error otherwise.
        elif self.__param_value == 'newline':
            lines = text.split('\n')
        else:
            raise InvalidParamValueError('Invalid parameter value provided for splitting text')
        stripped_lines = []
        previous_line = None
        for x in range(len(lines)):
            current_line = lines[x]
            if not current_line.isspace():
                current_line = current_line.strip()
                current_line = current_line.replace('\n', ' ')
                if current_line in sentence_terminators:
                    previous_line += current_line
                    # Add index check here to prevent errors when text starts with a terminator
                    stripped_lines[-1] = previous_line
                else:
                    stripped_lines.append(current_line)
                    previous_line = current_line
        return stripped_lines