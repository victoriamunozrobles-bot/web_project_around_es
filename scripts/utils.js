export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("mousedown", closeOnOverlayClick);
  document.addEventListener("keydown", closeOnEscPress);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener("mousedown", closeOnOverlayClick);
  document.removeEventListener("keydown", closeOnEscPress);
}

export function closeOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export function closeOnEscPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.name = name;

  popupCaption.textContent = name;
  openModal(imageModal);
}

export function fillProfileForm() {
  const currentName = profileName.textContent;
  const currentDescription = profileDescription.textContent;

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
}
