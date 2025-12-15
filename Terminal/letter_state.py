class Letter_State:
    def __init__(self, char: str):
        self.char: str = char
        self.is_in_word: bool = False
        self.is_in_position: bool = False
    
    def __repr__(self):
        return f"[{self.char} is in word: {self.is_in_word} is in positon: {self.is_in_position}]"