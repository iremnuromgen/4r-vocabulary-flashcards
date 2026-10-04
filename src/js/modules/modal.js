export function initCreateCollectionModal({ onClose } = {}) {
  const openModalBtn = document.getElementById("open-modal-btn");
  const createCollectionModal = document.getElementById(
    "create-collection-modal"
  );
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");

  const openModal = () => {
    if (!createCollectionModal) return;

    createCollectionModal.classList.remove("is-hidden");
  };

  const closeModal = () => {
    if (!createCollectionModal) return;

    createCollectionModal.classList.add("is-hidden");

    if (onClose) {
      onClose();
    }
  };

  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (cancelModalBtn) {
    cancelModalBtn.addEventListener("click", closeModal);
  }

  if (createCollectionModal) {
    createCollectionModal.addEventListener("click", (event) => {
      if (event.target === createCollectionModal) {
        closeModal();
      }
    });
  }
}