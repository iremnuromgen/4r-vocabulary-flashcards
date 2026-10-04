import { initCreateCollectionModal } from "./modules/modal.js";
import { initAddWords } from "./modules/words.js";
import {
  addCollection,
  updateCollection,
} from "./modules/storage.js";
import {
  initCollectionsPanel,
  renderCollections,
} from "./modules/collections.js";
import {
  initPractice,
  startPractice,
} from "./modules/practice.js";
import { initMobileNavigation } from "./modules/mobileNavigation.js";

document.addEventListener("DOMContentLoaded", () => {
  const wordsDraft = initAddWords();

  const modal = document.getElementById("create-collection-modal");
  const modalTitle = document.querySelector(".modal-title");
  const openModalBtn = document.getElementById("open-modal-btn");
  const nameInput = document.getElementById(
    "collection-name-input"
  );
  const saveBtn = document.getElementById(
    "save-collection-btn"
  );

  if (
    !modal ||
    !modalTitle ||
    !openModalBtn ||
    !nameInput ||
    !saveBtn
  ) {
    return;
  }

  let editingCollectionId = null;

  function resetModalState() {
    editingCollectionId = null;

    modalTitle.textContent = "Create Collection";
    saveBtn.textContent = "Save";

    nameInput.value = "";
    wordsDraft.resetDraft();
  }

  function prepareCreateMode() {
    resetModalState();
  }

  function openEditMode(collection) {
    editingCollectionId = collection.id;

    modalTitle.textContent = "Edit Collection";
    saveBtn.textContent = "Save";

    nameInput.value = collection.name;
    wordsDraft.loadDraftWords(collection.words);

    modal.classList.remove("is-hidden");
  }

  openModalBtn.addEventListener("click", prepareCreateMode);

  initCreateCollectionModal({
    onClose: resetModalState,
  });

  const mobileNavigation = initMobileNavigation({
    onNew: () => {
      prepareCreateMode();
      modal.classList.remove("is-hidden");
    },
  });

  initPractice({
    onEdit: (collection) => {
      openEditMode(collection);
    },

    onRemove: () => {
      renderCollections();
    },
  });

  initCollectionsPanel({
    onSelect: (collection) => {
      startPractice(collection);

      mobileNavigation.showPractice();
    },
  });

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const words = wordsDraft.getDraftWords();

    if (!name) return;
    if (words.length === 0) return;

    if (editingCollectionId) {
      const updatedCollection = updateCollection(
        editingCollectionId,
        {
          name,
          words,
        }
      );

      if (updatedCollection) {
        startPractice(updatedCollection);
      }
    } else {
      addCollection({
        name,
        words,
      });
    }

    renderCollections();

    modal.classList.add("is-hidden");

    resetModalState();
  });
});