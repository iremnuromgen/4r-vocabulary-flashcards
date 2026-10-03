import { createFlashcard } from "./components/flashcard.js";

let practiceEmpty;
let flashcardArea;

export function initPractice() {
  practiceEmpty = document.querySelector(".practice-empty");
  flashcardArea = document.querySelector(".flashcard-area");
}

export function startPractice(collection) {
  if (!practiceEmpty || !flashcardArea) return;
  if (!collection.words || collection.words.length === 0) return;

  practiceEmpty.style.display = "none";

  clearFlashcardArea();

  const firstWord = collection.words[0];
  const flashcard = createFlashcard(firstWord);

  flashcardArea.appendChild(flashcard);
}

function clearFlashcardArea() {
  while (flashcardArea.firstChild) {
    flashcardArea.firstChild.remove();
  }
}