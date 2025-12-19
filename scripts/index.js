import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

import {
  openModal,
  closeModal,
  closeOnOverlayClick,
  closeOnEscPress,
  openImagePopup,
  fillProfileForm,
} from "./utils.js";

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
const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const imageModal = document.querySelector("#image-popup");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");
const popupCloseBtn = imageModal.querySelector(".popup__close");
const editFormElement = document.querySelector("#edit-profile-form");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__msj-error_active",
  inputBorderErrorClass: "popup__input-error_active",
};

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
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCardData, cardsList);
  closeModal(newCardModal);
  newCardFormElement.reset();
}

function renderCard(data, container) {
  const cardInstance = new Card(data, "#card__template");
  const cardElement = cardInstance.getCardElement();
  container.append(cardElement);
}

initialCards.forEach(function (card) {
  renderCard(card, cardsList);
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

newCardFormElement.addEventListener("submit", handleCardFormSubmit);

popupCloseBtn.addEventListener("click", () => closeModal(imageModal));

const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardFormElement
);
newCardFormValidator.enableValidation();

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (formData) => {
    console.log(formData);
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleFormSubmit: (formData) => {
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();
