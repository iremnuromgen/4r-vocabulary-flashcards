import { createFlashcard } from "./components/flashcard.js";
import { openConfirm } from "./components/confirm.js";
import {
  updateCollectionProgress,
  resetCollectionProgress,
} from "./storage.js";

let practiceEmpty;
let flashcardArea;
let practiceActions;

let unknownBtn;
let knownBtn;

let practiceProgress;
let practiceProgressTitle;

let allWordsCount;
let knownWordsCount;
let unknownWordsCount;

let practiceAllBtn;
let practiceKnownBtn;
let practiceUnknownBtn;
let resetProgressBtn;

let activeCollection = null;

let practiceWords = [];
let currentWordIndex = 0;

let knownWords = [];
let unknownWords = [];

export function initPractice() {
  practiceEmpty = document.querySelector(".practice-empty");
  flashcardArea = document.querySelector(".flashcard-area");
  practiceActions = document.querySelector(".practice-actions");
  resetProgressBtn = document.getElementById("reset-progress-btn");

  unknownBtn = document.getElementById("unknown-btn");
  knownBtn = document.getElementById("known-btn");

  practiceProgress = document.querySelector(".practice-progress");
  practiceProgressTitle = document.querySelector(
    ".practice-progress__title"
  );

  allWordsCount = document.getElementById("all-words-count");
  knownWordsCount = document.getElementById("known-words-count");
  unknownWordsCount = document.getElementById("unknown-words-count");

  practiceAllBtn = document.getElementById("practice-all-btn");
  practiceKnownBtn = document.getElementById("practice-known-btn");
  practiceUnknownBtn = document.getElementById(
    "practice-unknown-btn"
  );

  if (
    !unknownBtn ||
    !knownBtn ||
    !practiceAllBtn ||
    !practiceKnownBtn ||
    !practiceUnknownBtn ||
    !resetProgressBtn
  ) {
    return;
  }

  unknownBtn.addEventListener("click", () => {
    answerCurrentWord("unknown");
  });

  knownBtn.addEventListener("click", () => {
    answerCurrentWord("known");
  });

  practiceAllBtn.addEventListener("click", () => {
    if (!activeCollection) return;

    startWordSet(activeCollection.words, "all");
  });

  practiceKnownBtn.addEventListener("click", () => {
    if (!activeCollection) return;

    const words = Array.isArray(activeCollection.knownWords)
      ? activeCollection.knownWords
      : [];

    startWordSet(words, "known");
  });

  practiceUnknownBtn.addEventListener("click", () => {
    if (!activeCollection) return;

    const words = Array.isArray(activeCollection.unknownWords)
      ? activeCollection.unknownWords
      : [];

    startWordSet(words, "unknown");
  });

  resetProgressBtn.addEventListener("click", resetProgress);
}

export function startPractice(collection) {
  if (!practiceEmpty || !flashcardArea || !practiceActions) {
    return;
  }

  if (!collection.words || collection.words.length === 0) {
    return;
  }

  activeCollection = collection;

  updatePracticeProgress(collection);

  practiceEmpty.style.display = "none";

  startWordSet(collection.words, "all");
}

function startWordSet(words, type) {
  clearFlashcardArea();

  if (!words.length) {
    practiceWords = [];
    currentWordIndex = 0;

    practiceActions.classList.add("is-hidden");

    setActivePracticeType(type);
    showEmptyWordSet(type);

    return;
  }

  practiceWords = shuffleWords(words);
  currentWordIndex = 0;

  knownWords = [];
  unknownWords = [];

  practiceActions.classList.remove("is-hidden");

  setActivePracticeType(type);
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

async function resetProgress() {
  if (!activeCollection) return;

  const hasKnownWords =
    Array.isArray(activeCollection.knownWords) &&
    activeCollection.knownWords.length > 0;

  const hasUnknownWords =
    Array.isArray(activeCollection.unknownWords) &&
    activeCollection.unknownWords.length > 0;

  if (!hasKnownWords && !hasUnknownWords) return;

  const confirmed = await openConfirm({
    title: "Reset progress?",
    message:
      "All known and unknown progress for this collection will be cleared.",
    cancelText: "Reset",
    continueText: "Cancel",
  });

  if (!confirmed) return;

  const updatedCollection = resetCollectionProgress(
    activeCollection.id,
    "all"
  );

  if (!updatedCollection) return;

  activeCollection = updatedCollection;

  updatePracticeProgress(activeCollection);
  startWordSet(activeCollection.words, "all");
}

function updatePracticeProgress(collection) {
  if (
    !practiceProgress ||
    !practiceProgressTitle ||
    !allWordsCount ||
    !knownWordsCount ||
    !unknownWordsCount
  ) {
    return;
  }

  const collectionKnownWords = Array.isArray(collection.knownWords)
    ? collection.knownWords
    : [];

  const collectionUnknownWords = Array.isArray(
    collection.unknownWords
  )
    ? collection.unknownWords
    : [];

  practiceProgressTitle.textContent = collection.name;

  allWordsCount.textContent = collection.words.length;
  knownWordsCount.textContent = collectionKnownWords.length;
  unknownWordsCount.textContent = collectionUnknownWords.length;

  resetProgressBtn.disabled =
  collectionKnownWords.length === 0 &&
  collectionUnknownWords.length === 0;

  practiceProgress.classList.remove("is-hidden");
}

function setActivePracticeType(type) {
  practiceAllBtn.classList.toggle("is-active", type === "all");
  practiceKnownBtn.classList.toggle("is-active", type === "known");
  practiceUnknownBtn.classList.toggle(
    "is-active",
    type === "unknown"
  );
}

function showEmptyWordSet(type) {
  const message = document.createElement("p");
  message.classList.add("practice-empty-set");

  if (type === "known") {
    message.textContent = "No known words yet.";
  } else if (type === "unknown") {
    message.textContent = "No unknown words yet.";
  } else {
    message.textContent = "No words to practice.";
  }

  flashcardArea.appendChild(message);
}

function finishPractice() {
  if (activeCollection) {
    const updatedCollection = updateCollectionProgress(
      activeCollection.id,
      knownWords,
      unknownWords
    );

    if (updatedCollection) {
      activeCollection = updatedCollection;
      updatePracticeProgress(activeCollection);
    }
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
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

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