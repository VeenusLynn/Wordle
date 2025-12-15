const fs = require("fs");

const validWords = fs
  .readFileSync("words.txt", "utf-8")
  .split("\n")
  .map((w) => w.trim())
  .filter(Boolean);

const answerWords = fs
  .readFileSync("wordlist_nyt20230701_hidden.txt", "utf-8")
  .split("\n")
  .map((w) => w.trim())
  .filter(Boolean);

fs.writeFileSync("valid-words.json", JSON.stringify(validWords, null, 2));

fs.writeFileSync("answer-words.json", JSON.stringify(answerWords, null, 2));

console.log("✅ Word lists converted to JSON");
