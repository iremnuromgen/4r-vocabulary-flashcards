import { createFlashcard } from "./components/flashcard.js";

let practiceEmpty;
let flashcardArea;

let practiceWords = [];

export function initPractice() {
  practiceEmpty = document.querySelector(".practice-empty");
  flashcardArea = document.querySelector(".flashcard-area");
}

export function startPractice(collection) {
  if (!practiceEmpty || !flashcardArea) return;
  if (!collection.words || collection.words.length === 0) return;

  practiceEmpty.style.display = "none";

  clearFlashcardArea();

  practiceWords = shuffleWords(collection.words);

  const firstWord = practiceWords[0];
  const flashcard = createFlashcard(firstWord);

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