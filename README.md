# Wordle

A Wordle clone implemented both as a terminal-based Python game and as a fully playable web version.

The web version is deployed and playable online **no local setup required**

**👉 Play here:** [https://wordle-veenuslynn.netlify.app/](https://wordle-veenuslynn.netlify.app/)

---

## Overview

This project is an independent implementation of the Wordle game mechanics, created for learning and experimentation purposes.

It aims to:

- Reproduce the core Wordle logic accurately
- Correctly handle duplicate letters
- Use realistic word lists similar to the original game
- Provide both a simple terminal experience and a modern web interface

---

## Web Version (Browser)

The web version includes:

- Interactive 6×5 game board
- On-screen keyboard
- Keyboard input support
- Correct color feedback:
  - 🟩 **Green** — correct letter, correct position
  - 🟨 **Yellow** — correct letter, wrong position
  - ⬛ **Gray** — letter not in the word
- Proper handling of repeated letters
- Guess validation against a full dictionary
- Endgame modals (win / loss)
- Responsive design
- Deployed with Netlify

### Live Demo

You can play the game directly here: **🔗 [https://wordle-veenuslynn.netlify.app/](https://wordle-veenuslynn.netlify.app/)**

---

## Terminal Version (Python)

The repository also contains an earlier terminal-based implementation written in Python.

**Features:**

- Text-based gameplay
- Guess validation
- 6 attempts per game
- Random target word selection
- Core Wordle logic without UI animations

---

## Word Lists & Data Sources

Wordle uses two different word lists, and this project follows the same concept.

### 1️⃣ Valid Guess List (14,855 words)

- **File:** `valid-words.json`
- **Purpose:** determines which guesses are accepted by the game
- Contains all words that are allowed to be typed, even if they will never appear as answers

This list consists of 14,855 entries, matching the full NYT Wordle guess dictionary.

### 2️⃣ Possible Answer List (3,158 words)

- **File:** `answer-words.json`
- **Purpose:** words that can actually be chosen as the solution
- Significantly smaller and more curated

⚠️ **Important note:** There is no official, public list of Wordle answers used by the New York Times. The daily solution is editorially chosen and not fully disclosed.

Because of this, this project uses a curated list of possible answers sourced from WordleBot analysis, which reflects realistic and commonly used solution words.

### Source Credit

Both word lists are sourced from the following open repository:

**🔗 [https://github.com/alex1770/wordle](https://github.com/alex1770/wordle)**

Specifically:

- Full valid guess list (14,855 words)
- Hidden answer list (3,158 words), compiled from WordleBot data

These lists are widely used by Wordle clones and research tools and provide a transparent, reproducible dataset.

---


## Disclaimer

This project is not affiliated with or endorsed by The New York Times. Wordle is a trademark of The New York Times Company.

This clone is intended solely for educational and personal use.
