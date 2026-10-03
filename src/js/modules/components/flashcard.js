export function createFlashcard(word) {
  const card = document.createElement("button");
  card.type = "button";
  card.classList.add("flashcard");

  const wordEl = document.createElement("span");
  wordEl.classList.add("flashcard__word");
  wordEl.textContent = word.from;

  card.appendChild(wordEl);

  return card;
}