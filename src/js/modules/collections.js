import { getCollections } from "./storage.js";
import { createCollectionItem } from "./components/collectionItem.js";

let listEl;
let emptyEl;
let onCollectionSelect;

function clearList() {
  const children = Array.from(listEl.children);

  children.forEach((child) => {
    if (emptyEl && child === emptyEl) return;

    child.remove();
  });
}

export function renderCollections() {
  if (!listEl) return;

  const collections = getCollections();

  clearList();

  if (collections.length === 0) {
    listEl.classList.add("is-empty");

    if (emptyEl) {
      emptyEl.style.display = "";
    }

    return;
  }

  listEl.classList.remove("is-empty");

  if (emptyEl) {
    emptyEl.style.display = "none";
  }

  collections.forEach((collection) => {
    const item = createCollectionItem(collection);

    item.addEventListener("click", () => {
      if (onCollectionSelect) {
        onCollectionSelect(collection);
      }
    });

    listEl.appendChild(item);
  });
}

export function initCollectionsPanel({ onSelect } = {}) {
  listEl = document.querySelector(".collections-list");

  if (!listEl) return;

  emptyEl = listEl.querySelector(".empty-state");
  onCollectionSelect = onSelect;

  renderCollections();
}