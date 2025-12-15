def main() :
    input_file_path = "data/words.txt"
    output_file_path = "data/Wordle_words.txt"
    valid_wordle_words = []

    with open(input_file_path, "r") as f:
        for line in f.readlines() :
            word = line.strip()
            if len(word) == 5 :
                valid_wordle_words.append(word)

    with open(output_file_path, "w") as f:
        for word in valid_wordle_words :
            f.write(word + "\n")
    
    print (f"number of valid wordle words found : {len(valid_wordle_words)}")

if __name__ == "__main__" :
    main()