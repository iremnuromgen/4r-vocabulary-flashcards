import { createFlashcard } from "./components/flashcard.js";
import { updateCollectionProgress } from "./storage.js";

let practiceEmpty;
let flashcardArea;
let practiceActions;
let unknownBtn;
let knownBtn;

let practiceWords = [];
let currentWordIndex = 0;

let knownWords = [];
let unknownWords = [];

let activeCollectionId = null;

export function initPractice() {
  practiceEmpty = document.querySelector(".practice-empty");
  flashcardArea = document.querySelector(".flashcard-area");
  practiceActions = document.querySelector(".practice-actions");
  unknownBtn = document.getElementById("unknown-btn");
  knownBtn = document.getElementById("known-btn");

  if (!unknownBtn || !knownBtn) return;

  unknownBtn.addEventListener("click", () => {
    answerCurrentWord("unknown");
  });

  knownBtn.addEventListener("click", () => {
    answerCurrentWord("known");
  });
}

export function startPractice(collection) {
  if (!practiceEmpty || !flashcardArea || !practiceActions) return;
  if (!collection.words || collection.words.length === 0) return;

  practiceEmpty.style.display = "none";
  practiceActions.classList.remove("is-hidden");

  practiceWords = shuffleWords(collection.words);
  currentWordIndex = 0;

  knownWords = [];
  unknownWords = [];

  activeCollectionId = collection.id;

  showCurrentCard();
}

function answerCurrentWord(answer) {
  if (!practiceWords.length) return;

  const currentWord = practiceWords[currentWordIndex];

  if (answer === "known") {
    knownWords.push(currentWord);
  }

  if (answer === "unknown") {
    unknownWords.push(currentWord);
  }

  if (currentWordIndex >= practiceWords.length - 1) {
    finishPractice();
    return;
  }

  showNextCard();
}

function showNextCard() {
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

function finishPractice() {
  if (activeCollectionId) {
    updateCollectionProgress(
      activeCollectionId,
      knownWords,
      unknownWords
    );
  }

  clearFlashcardArea();

  practiceActions.classList.add("is-hidden");

  const result = document.createElement("div");
  result.classList.add("practice-result");

  const title = document.createElement("h3");
  title.classList.add("practice-result__title");
  title.textContent = "Practice complete";

  const summary = document.createElement("p");
  summary.classList.add("practice-result__summary");
  summary.textContent =
    `${knownWords.length} known · ${unknownWords.length} unknown`;

  result.appendChild(title);
  result.appendChild(summary);

  flashcardArea.appendChild(result);
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