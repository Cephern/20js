const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const startBtn = document.getElementById("start-btn");

// List of words

const words = [
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//  Init word
let randomWord;

// No dublicate words in a row
let previousWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Game ended tracker

let gameEnded = false;

// No time abuse
let gameStarted = false;

//  Init countdown
let timeInterval;

let difficulty = localStorage.getItem("difficulty") || "medium";

// Set difficulty text
difficultySelect.value = difficulty;

// Focus on input on start
startBtn.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  if (randomWord == previousWord) {
    index = words.indexOf(randomWord);
    index < words.length - 1
      ? (randomWord = words[index + 1])
      : (randomWord = words[index - 1]);
  }

  previousWord = randomWord;
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time;

  if (!time) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
    `;

  endgameEl.style.display = "flex";
  gameEnded = true;
  startBtn.innerText = "Retry";
}

// Inits

addWordToDOM();

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDOM();

    updateScore();
    if (gameStarted) {
      if (difficulty === "hard") {
        time += 2;
      } else if (difficulty === "medium") {
        time += 3;
      } else {
        time += 5;
      }
    }
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

startBtn.addEventListener("click", () => {
  gameStarted = true;
  timeInterval = setInterval(updateTime, 1000);
  text.focus();
  updateTime();

  if (gameEnded) {
    location.reload();
  }
});
