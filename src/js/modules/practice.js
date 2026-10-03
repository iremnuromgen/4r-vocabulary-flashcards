import { createFlashcard } from "./components/flashcard.js";

let practiceEmpty;
let flashcardArea;
let practiceActions;
let unknownBtn;
let knownBtn;

let practiceWords = [];
let currentWordIndex = 0;

export function initPractice() {
  practiceEmpty = document.querySelector(".practice-empty");
  flashcardArea = document.querySelector(".flashcard-area");
  practiceActions = document.querySelector(".practice-actions");
  unknownBtn = document.getElementById("unknown-btn");
  knownBtn = document.getElementById("known-btn");

  if (!unknownBtn || !knownBtn) return;

  unknownBtn.addEventListener("click", showNextCard);
  knownBtn.addEventListener("click", showNextCard);
}

export function startPractice(collection) {
  if (!practiceEmpty || !flashcardArea || !practiceActions) return;
  if (!collection.words || collection.words.length === 0) return;

  practiceEmpty.style.display = "none";
  practiceActions.classList.remove("is-hidden");

  practiceWords = shuffleWords(collection.words);
  currentWordIndex = 0;

  showCurrentCard();
}

function showNextCard() {
  if (!practiceWords.length) return;

  if (currentWordIndex >= practiceWords.length - 1) {
    return;
  }

  currentWordIndex++;

  showCurrentCard();
}

function showCurrentCard() {
  if (!practiceWords.length) return;

  clearFlashcardArea();

  const currentWord = practiceWords[currentWordIndex];
  const flashcard = createFlashcard(currentWord);

  flashcardArea.appendChild(flashcard);
}

function shuffleWords(words) {
  const shuffled = [...words];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function clearFlashcardArea() {
  while (flashcardArea.firstChild) {
    flashcardArea.firstChild.remove();
  }
}