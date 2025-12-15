let ANSWER_WORDS = [];
let VALID_WORDS = new Set();

async function loadWordLists() {
  const [answersRes, validRes] = await Promise.all([
    fetch("words/answer-words.json"),
    fetch("words/valid-words.json"),
  ]);

  const answers = await answersRes.json();
  const valid = await validRes.json();

  ANSWER_WORDS = answers.map((w) => w.toUpperCase());
  VALID_WORDS = new Set(valid.map((w) => w.toUpperCase()));
}

let targetWord = "";
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let currentGuess = "";
const keyStates = {};

async function init() {
  await loadWordLists();

  targetWord = ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)];
  // targetWord = "MEDIC";
  // console.log("Target word:", targetWord);

  createBoard();
  attachEventListeners();
}

function createBoard() {
  const board = document.getElementById("game-board");
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.setAttribute("data-row", i);
      tile.setAttribute("data-col", j);
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function attachEventListeners() {
  document.addEventListener("keydown", handleKeyPress);

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", () => {
      const keyValue = key.getAttribute("data-key");
      handleInput(keyValue);
    });
  });

  document.getElementById("play-again").addEventListener("click", resetGame);
}

function handleKeyPress(e) {
  if (gameOver) return;

  const key = e.key.toLowerCase();

  if (key === "enter") {
    handleInput("enter");
  } else if (key === "backspace") {
    handleInput("backspace");
  } else if (/^[a-z]$/.test(key)) {
    handleInput(key);
  }
}

function handleInput(key) {
  if (gameOver) return;

  if (key === "enter") {
    submitGuess();
  } else if (key === "backspace") {
    deleteLetter();
  } else if (currentTile < 5) {
    addLetter(key);
  }
}

function addLetter(letter) {
  if (currentTile < 5) {
    const tile = document.querySelector(
      `[data-row="${currentRow}"][data-col="${currentTile}"]`
    );
    tile.textContent = letter.toUpperCase();
    tile.classList.add("filled");
    currentGuess += letter.toUpperCase();
    currentTile++;
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.querySelector(
      `[data-row="${currentRow}"][data-col="${currentTile}"]`
    );
    tile.textContent = "";
    tile.classList.remove("filled");
    currentGuess = currentGuess.slice(0, -1);
  }
}

function submitGuess() {
  if (currentTile !== 5) {
    showMessage("Not enough letters");
    shakeTiles();
    return;
  }

  if (!VALID_WORDS.has(currentGuess)) {
    showMessage("Not in word list");
    shakeTiles();
    return;
  }

  flipTiles();
}

function shakeTiles() {
  for (let i = 0; i < 5; i++) {
    const tile = document.querySelector(
      `[data-row="${currentRow}"][data-col="${i}"]`
    );
    tile.classList.add("shake");
    setTimeout(() => tile.classList.remove("shake"), 500);
  }
}

function flipTiles() {
  const guess = currentGuess;
  const result = checkGuess(guess);

  for (let i = 0; i < 5; i++) {
    const tile = document.querySelector(
      `[data-row="${currentRow}"][data-col="${i}"]`
    );

    setTimeout(() => {
      tile.classList.add("flip");

      setTimeout(() => {
        tile.classList.add(result[i]);
        updateKeyboard(guess[i], result[i]);
      }, 300);
    }, i * 300);
  }

  setTimeout(() => {
    if (guess === targetWord) {
      gameOver = true;
      setTimeout(
        () => showModal("Excellent!", `You found the word: ${targetWord}`),
        500
      );
    } else if (currentRow === 5) {
      gameOver = true;
      setTimeout(
        () => showModal("Game Over", `The word was: ${targetWord}`),
        500
      );
    } else {
      currentRow++;
      currentTile = 0;
      currentGuess = "";
    }
  }, 1800);
}

function checkGuess(guess) {
  const result = Array(5).fill("absent");
  const targetLetters = targetWord.split("");
  const guessLetters = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "correct";
      targetLetters[i] = null;
      guessLetters[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] !== null) {
      const index = targetLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = "present";
        targetLetters[index] = null;
      }
    }
  }

  return result;
}

function updateKeyboard(letter, state) {
  const key = document.querySelector(`[data-key="${letter.toLowerCase()}"]`);
  if (!key) return;

  const currentState = keyStates[letter];

  if (state === "correct") {
    key.classList.remove("absent", "present");
    key.classList.add("correct");
    keyStates[letter] = "correct";
  } else if (state === "present" && currentState !== "correct") {
    key.classList.remove("absent");
    key.classList.add("present");
    keyStates[letter] = "present";
  } else if (state === "absent" && !currentState) {
    key.classList.add("absent");
    keyStates[letter] = "absent";
  }
}

function showMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 2000);
}

function showModal(title, message) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal").classList.add("show");
}

function resetGame() {
  currentRow = 0;
  currentTile = 0;
  currentGuess = "";
  gameOver = false;
  Object.keys(keyStates).forEach((key) => delete keyStates[key]);

  document.querySelectorAll(".tile").forEach((tile) => {
    tile.textContent = "";
    tile.className = "tile";
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("absent", "present", "correct");
  });

  document.getElementById("modal").classList.remove("show");

  targetWord =
    ANSWER_WORDS[Math.floor(Math.random() * ANSWER_WORDS.length)].toUpperCase();
  // console.log("New target word:", targetWord);
}

init();
