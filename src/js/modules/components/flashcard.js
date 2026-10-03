export function createFlashcard(word) {
  const card = document.createElement("button");
  card.type = "button";
  card.classList.add("flashcard");

  const cardInner = document.createElement("div");
  cardInner.classList.add("flashcard__inner");

  const front = createCardFace("flashcard__front", word.from);
  const back = createCardFace("flashcard__back", word.to);

  cardInner.appendChild(front);
  cardInner.appendChild(back);

  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });

  return card;
}

function createCardFace(className, text) {
  const face = document.createElement("div");
  face.classList.add("flashcard__face", className);

  const wordEl = document.createElement("span");
  wordEl.classList.add("flashcard__word");
  wordEl.textContent = text;

  face.appendChild(wordEl);

  return face;
}