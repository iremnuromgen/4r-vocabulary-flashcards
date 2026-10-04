export function initMobileNavigation({ onNew } = {}) {
  const practicePanel = document.querySelector(".practice-panel");
  const collectionsPanel = document.querySelector(".collections-panel");

  const practiceBtn = document.getElementById(
    "mobile-practice-btn"
  );

  const collectionsBtn = document.getElementById(
    "mobile-collections-btn"
  );

  const newBtn = document.getElementById("mobile-new-btn");

  if (
    !practicePanel ||
    !collectionsPanel ||
    !practiceBtn ||
    !collectionsBtn ||
    !newBtn
  ) {
    return {
      showPractice: () => {},
      showCollections: () => {},
    };
  }

  function showPractice() {
    practicePanel.classList.add("is-mobile-active");
    collectionsPanel.classList.remove("is-mobile-active");

    practiceBtn.classList.add("is-active");
    collectionsBtn.classList.remove("is-active");
  }

  function showCollections() {
    collectionsPanel.classList.add("is-mobile-active");
    practicePanel.classList.remove("is-mobile-active");

    collectionsBtn.classList.add("is-active");
    practiceBtn.classList.remove("is-active");
  }

  practiceBtn.addEventListener("click", showPractice);
  collectionsBtn.addEventListener("click", showCollections);

  newBtn.addEventListener("click", () => {
    if (onNew) {
      onNew();
    }
  });

  return {
    showPractice,
    showCollections,
  };
}