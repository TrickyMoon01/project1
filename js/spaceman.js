const wordList = ["kobe", "jordan", "lebron", "shaq"];
const maxWrong = 6;

let word = wordList[Math.floor(Math.random() * wordList.length)];
let guessed = [];
let wrong = [];

function updateDisplay() {
  const wordDisplay = document.getElementById("wordDisplay");
  const wrongLetters = document.getElementById("wrongLetters");
  const result = document.getElementById("result");

  let display = word
    .split("")
    .map(letter => (guessed.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;

  wrongLetters.textContent = wrong.join(" ");

  if (!display.includes("_")) {
    result.textContent = "You Win!";
  }

  if (wrong.length >= maxWrong) {
    result.textContent = `You Lose! The word was "${word}"`;
  }
  updateHangmanFigure();
}

function guessLetter() {
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();
  input.value = "";

  if (!letter.match(/[a-z]/) || letter.length !== 1) return;

  if (guessed.includes(letter) || wrong.includes(letter)) return;

  if (word.includes(letter)) {
    guessed.push(letter);
  } else {
    wrong.push(letter);
  }

  updateDisplay();
}

updateDisplay();
function resetGame() {

  word = wordList[Math.floor(Math.random() * wordList.length)];


  guessed = [];
  wrong = [];


  document.getElementById("letterInput").value = "";

  document.getElementById("result").textContent = "";

  updateDisplay();
}

function updateHangmanFigure() {
  const parts = document.querySelectorAll(".part");
  parts.forEach((part, index) => {
    part.style.display = index < wrong.length ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volumeRange");

  if (!bgMusic || !volumeSlider) {
    console.warn("Missing audio or volume slider element.");
    return;
  }

  bgMusic.volume = volumeSlider.value;

  document.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(err => console.warn("Playback blocked:", err));
    }
  }, { once: true });

  volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value;
  });
});
