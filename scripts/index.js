const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeModalBtn = editModal.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description"
);
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template").content;
const addCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
const newCardFormElement = document.querySelector("#new-card-form");
const newCardFormInputs = Array.from(
  newCardFormElement.querySelectorAll(".popup__input")
);
const newCardFormSubmitBtn = newCardFormElement.querySelector(".popup__button");
const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const imageModal = document.querySelector("#image-popup");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");
const popupCloseBtn = imageModal.querySelector(".popup__close");
const editFormElement = document.querySelector("#edit-profile-form");
const editFormElementInputs = Array.from(
  editFormElement.querySelectorAll(".popup__input")
);
const editModalSubmitBtn = editFormElement.querySelector(".popup__button");

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.name = name;

  popupCaption.textContent = name;
  openModal(imageModal);
}

function fillProfileForm() {
  const currentName = profileName.textContent;
  const currentDescription = profileDescription.textContent;

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
}

function handleOpenedEditModal() {
  openModal(editModal);
  fillProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsList);
  closeModal(newCardModal);
  newCardForm.reset();
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardItem = cardElement.querySelector(".card");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.alt = name;
  cardImage.src = link;
  cardTitle.textContent = name;

  cardLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  cardDeleteBtn.addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(link, name);
  });

  return cardItem;
}

function renderCard(name, link, container) {
  const newCardElement = getCardElement(name, link);
  container.append(newCardElement);
}
function showInputError(formElement, element, errorMessage) {
  const errorElement = formElement.querySelector(
    `span.${element.name}-input-error`
  );
  element.classList.add("popup__input-error_active");
  errorElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__msj-error_active");
}

function hideInputError(formElement, element) {
  const errorElement = formElement.querySelector(
    `span.${element.name}-input-error`
  );
  element.classList.remove("popup__input-error_active");
  errorElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__msj-error_active");
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
}

editFormElementInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showInputError(editFormElement, input, input.validationMessage);
    } else {
      hideInputError(editFormElement, input);
    }

    toggleButtonState(editFormElementInputs, editModalSubmitBtn);
  });
});

newCardFormInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showInputError(newCardFormElement, input, input.validationMessage);
    } else {
      hideInputError(newCardFormElement, input);
    }

    toggleButtonState(newCardFormInputs, newCardFormSubmitBtn);
  });
});

editProfileBtn.addEventListener("click", function (evt) {
  handleOpenedEditModal();
});

closeModalBtn.addEventListener("click", function (evt) {
  closeModal(editModal);
});

editModal.addEventListener("submit", handleProfileFormSubmit);

addCardBtn.addEventListener("click", () => openModal(newCardModal));

newCardCloseBtn.addEventListener("click", () => closeModal(newCardModal));

newCardForm.addEventListener("submit", handleCardFormSubmit);

popupCloseBtn.addEventListener("click", () => closeModal(imageModal));

toggleButtonState(editFormElementInputs, editModalSubmitBtn);
toggleButtonState(newCardFormInputs, newCardFormSubmitBtn);
