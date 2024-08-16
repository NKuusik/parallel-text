"""
Services.
"""
import re

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
            sentence_terminators = ['.','?', '!']
            lines = re.split('([.|?|!])', text)
        # Todo: explicitly check for the value to be either 'newline' or 'sentence'
        # and raise error otherwise.
        else:
            lines = text.split('\n')
        stripped_lines = []
        previous_line = None
        for x in range(len(lines)):
            current_line = lines[x]
            if not current_line.isspace():
                current_line = current_line.strip()
                current_line = current_line.replace('\n', ' ')
                if current_line in sentence_terminators:
                    previous_line += current_line
                    stripped_lines[-1] = previous_line
                else:
                    stripped_lines.append(current_line)
                    previous_line = current_line
        return stripped_lines