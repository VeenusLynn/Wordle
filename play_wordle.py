from ast import List
from wordle import Wordle 
from letter_state import Letter_State
from colorama import Fore, Back, Style

def main ():

    # starting the game and choosing the secret wordle
    print("The game is running now...") 
    wordle = Wordle("cutie")

    # testing
    # print(wordle.can_still_play)
    # print(wordle.attempts)
    # print(wordle.game_won)
    # print(wordle.remaining_attempts)
    # print(wordle.secret)

    while wordle.can_still_play :

        # ask the player for a a valid word 
        while True :
            word= input (Style.BRIGHT + "Enter your guess : "+ Style.RESET_ALL).upper()
            if wordle.valid_guess(word) :
                break
            else :
                print(Fore.RED + f"invalid guess, it must be {wordle.MAX_WORD_SIZE} characters long \ntry again" + Style.RESET_ALL)

        # append the valid guess to the attemps list
        wordle.new_attempt (word)

        # checking if letters of the guess are in word/position
        result = wordle.check_existance_postion(word)
        print(*result, sep="\n")

    # this ones self explanatory x)
    if wordle.game_won :
        print(Fore.WHITE + Back.GREEN + "Correct! You won." + Style.RESET_ALL)
    else:
        print(Fore.WHITE + Back.RED + "You lost the game." + Style.RESET_ALL) 

# def display_results(wordle: Wordle):
#    for word in wordle.attempts :
#        letters = wordle.check_existance_postion(word)

# def letters_to_colors (result: List[Letter_State] ):
#     letters_in_color = []
#     for letter in result :
#         if letter.is_in_position:
#             color = Fore.GREEN
#         elif letter.is_in_word :
#             color = Fore.YELLOW
#         else :
#             color = Fore.WHITE


# run the main    
if __name__ == '__main__':
    main()