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

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._fillCardData();

    return this._cardElement;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    openImagePopup(this._link, this._name);
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    const cardImage = this._cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", (evt) => this._handleLikeClick(evt));
    deleteButton.addEventListener("click", () => this._handleDeleteClick());
    cardImage.addEventListener("click", (evt) => this._handleImageClick());
  }

  _fillCardData() {
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
  }
}

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.add(this._settings.inputBorderErrorClass);
    errorElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorVisibleClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.remove(this._settings.inputBorderErrorClass);
    errorElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorVisibleClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__msj-error_active",
  inputBorderErrorClass: ".popup__input-error_active",
};

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("mousedown", closeOnOverlayClick);
  document.addEventListener("keydown", closeOnEscPress);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener("mousedown", closeOnOverlayClick);
  document.removeEventListener("keydown", closeOnEscPress);
}

function closeOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeOnEscPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
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
