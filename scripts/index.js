import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const handleCardClick = (link, name) => {
  imagePopup.open(link, name);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card__template", handleCardClick);
      const cardElement = card.getCardElement();
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardList.renderItems();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({ name: formData.name, job: formData.description });
    editProfilePopup.close();
  },
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (formData) => {
    const newCardData = {
      name: formData["place-name"],
      link: formData.link,
    };
    const card = new Card(newCardData, "#card__template", handleCardClick);
    cardList.addItem(card.getCardElement());
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardFormElement
);
newCardFormValidator.enableValidation();

editProfileBtn.addEventListener("click", () => {
  const currentData = userInfo.getUserInfo();
  document.querySelector(".popup__input_type_name").value = currentData.name;
  document.querySelector(".popup__input_type_description").value =
    currentData.job;
  editProfilePopup.open();
});

addCardBtn.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  addCardPopup.open();
});
