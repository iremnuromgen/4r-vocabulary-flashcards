import { createSvgIcon } from "./svg.js";

function createResetIcon() {
  return createSvgIcon(
    [
      "M3 12a9 9 0 1 0 3-6.7",
      "M3 4v5h5",
    ],
    "collection-control-btn__icon"
  );
}

function createEditIcon() {
  return createSvgIcon(
    [
      "M12 20h9",
      "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
    ],
    "collection-control-btn__icon"
  );
}

function createRemoveIcon() {
  return createSvgIcon(
    [
      "M3 6h18",
      "M8 6V4h8v2",
      "M19 6l-1 14H6L5 6",
      "M10 11v6",
      "M14 11v6",
    ],
    "collection-control-btn__icon"
  );
}

function createControlButton({
  id,
  label,
  modifierClass,
  icon,
  onClick,
}) {
  const button = document.createElement("button");
  button.type = "button";
  button.id = id;
  button.classList.add("collection-control-btn");

  if (modifierClass) {
    button.classList.add(modifierClass);
  }

  button.setAttribute("aria-label", label);
  button.title = label;

  button.appendChild(icon);

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
}

export function createCollectionControls({
  onReset,
  onEdit,
  onRemove,
}) {
  const element = document.createElement("div");
  element.classList.add("collection-controls");

  const resetBtn = createControlButton({
    id: "collection-reset-btn",
    label: "Reset progress",
    modifierClass: "collection-control-btn--reset",
    icon: createResetIcon(),
    onClick: onReset,
  });

  const editBtn = createControlButton({
    id: "collection-edit-btn",
    label: "Edit collection",
    modifierClass: "collection-control-btn--edit",
    icon: createEditIcon(),
    onClick: onEdit,
  });

  const removeBtn = createControlButton({
    id: "collection-remove-btn",
    label: "Remove collection",
    modifierClass: "collection-control-btn--remove",
    icon: createRemoveIcon(),
    onClick: onRemove,
  });

  element.appendChild(resetBtn);
  element.appendChild(editBtn);
  element.appendChild(removeBtn);

  return {
    element,
    resetBtn,
    editBtn,
    removeBtn,
  };
}