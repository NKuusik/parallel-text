"""
Services.
"""

class TextSplitter:
    def __init__(self, param_value):
        self.__separator = self.parse_separator(param_value)
    
    def parse_separator(self, param_value):
        """
        Provide the separator value according to the param_value received from the query.
        """
        # Todo: explicitly check for the value to be either 'newline' or 'sentence'
        # and raise error otherwise.
        separator = '\n'
        if param_value == 'sentence':
            separator = '.'            
        return separator

    def split_text(self, text):
        lines = text.split(self.__separator)
        stripped_lines = []
        # Restore the separator to the end of if it is not newline
        for x in range(len(lines)):
            current_line = lines[x]
            if current_line != '':
                if x < len(lines) - 1:
                    current_line += self.__separator
                current_line = current_line.strip()
                current_line = current_line.replace('\n', ' ')
                stripped_lines.append(current_line)
        return stripped_lines