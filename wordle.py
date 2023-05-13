from letter_state import Letter_State

class Wordle:
    
    MAX_ATTEMPTS = 6
    MAX_WORD_SIZE = 5

    def __init__(self, secret: str ):
        self.secret: str = secret.upper()
        self.attempts = []

    def valid_guess (self, word):
        return len(word) == self.MAX_WORD_SIZE

    def check_existance_postion(self, word: str):

        result = []
        
        for i in range(self.MAX_WORD_SIZE) :
            char =word[i]
            letter = Letter_State(char)
            letter.is_in_word = char in self.secret 
            letter.is_in_position = char == self.secret[i]
            result.append(letter)
        
        return result

    @property
    def game_won (self):
        return len(self.attempts) > 0 and self.attempts[-1] == self.secret
    
    @property
    def remaining_attempts (self) -> int:
        return self.MAX_ATTEMPTS - len(self.attempts) 
    
    def new_attempt (self, word: str):
        self.attempts.append(word)

    @property
    def can_still_play (self):
        return self.remaining_attempts > 0 and not self.game_won