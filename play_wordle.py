from ast import List
from wordle import Wordle 
from letter_state import Letter_State
from colorama import Fore, Back, Style
import random

def main ():

    # picking a random secret word to play with from our data
    input_file_path = "data/Wordle_words.txt"
    word_set = load_word_set (input_file_path)
    secret = random.choice(list(word_set))
   
    wordle = Wordle(secret)


    while wordle.can_still_play :

        # ask the player for a a valid word 
        while True :
            word= input (Style.BRIGHT + "\nEnter your guess : "+ Style.RESET_ALL).upper()
            if wordle.valid_guess(word) :
                break
            else :
                print(Fore.RED + f"invalid guess, it must be {wordle.MAX_WORD_SIZE} characters long \ntry again" + Style.RESET_ALL)

        # append the valid guess to the attemps list
        wordle.new_attempt (word)
        display_results(wordle)

    # this ones self explanatory x)
    if wordle.game_won :
        print(Fore.WHITE + Back.GREEN + "Correct! You won." + Style.RESET_ALL)
    else:
        print(Fore.WHITE + Back.RED + "You lost the game." + Style.RESET_ALL) 
        print(f"The secret word was : {secret} \nBetter luck next time!")

def load_word_set(path: str):
    word_set = set ()
    with open(path, "r") as f:
        for line in f.readlines() :
            word = line.strip().upper()
            word_set.add(word)
    return word_set

def display_results(wordle: Wordle):
    print ("\n")

    lines = []

    for word in wordle.attempts :
        letters = wordle.check_existance_postion(word)
        colored_letters_str = letters_to_colors(letters)
        print(colored_letters_str)
        lines.append(colored_letters_str)
    
    for _ in range(wordle.remaining_attempts) :
        #print("_ " * wordle.MAX_WORD_SIZE)
        lines.append("_ " * wordle.MAX_WORD_SIZE)
    
    # The border is ugly unfortunately :(
    border(lines , 9, 2)
       

def letters_to_colors (result):
    letters_in_color = []
    for letter in result :
        if letter.is_in_position:
            color = Fore.GREEN
        elif letter.is_in_word :
            color = Fore.YELLOW
        else : 
            color = Fore.WHITE
        colored_letter = color + letter.char + Style.RESET_ALL 
        letters_in_color.append(colored_letter)
    return " ".join(letters_in_color)

def border (lines, size: int, pad: int) :

    content_length = size +pad

    top_border = "┌" + "─" * content_length + "┐"
    bot_border = "└"+ "─" * content_length + "┘"
    left_border = "│" + " " * pad
    right_border = " " * pad + "│" 

    # diplaying the border and content
    print(top_border + "\n")

    for line in lines :
        print (left_border + line + right_border +"\n")

    print(bot_border)
    
    # box drawing characters
    #"┌	" + "┘" + "─" + "└" + "┐" + "│"


# run the main    
if __name__ == '__main__':
    # starting the game 
    print("The game is running now...") 
    main()