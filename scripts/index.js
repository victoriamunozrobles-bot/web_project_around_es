import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

/* ---------- CONFIG ---------- */

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__msj-error_active",
  inputBorderErrorClass: "popup__input-error_active",
};

let userId;

/* ---------- API ---------- */

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "0cd74733-0a47-4a65-a908-df6a75fbf190",
    "Content-Type": "application/json",
  },
});

/* ---------- USER ---------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/* ---------- POPUPS ---------- */

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithConfirmation(
  ".popup_type_delete-confirmation",
);
deleteConfirmPopup.setEventListeners();

/* ---------- CREAR TARJETA ---------- */

function createCard(data) {
  const card = new Card(
    data,
    "#card__template",
    (link, name) => imagePopup.open(link, name),
    (cardId) => {
      deleteConfirmPopup.open();
      deleteConfirmPopup.setConfirmAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.removeCard();
            deleteConfirmPopup.close();
          })
          .catch(console.log);
      });
    },
    (cardId) => {
      api
        .changeLikeStatus(cardId, card._likes)
        .then((newData) => card.setLikes(newData.isLiked))
        .catch(console.log);
    },
    userId,
  );

  return card.getCardElement();
}

/* ---------- SECCIÓN ---------- */

const cardList = new Section(
  {
    items: [],
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list",
);

/* ---------- CARGA INICIAL ---------- */

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardList.renderItems(cards);
  })
  .catch(console.log);

/* ---------- FORMULARIOS (POPUPS) ---------- */

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (data) => {
    editProfilePopup.renderLoading(true);
    api
      .editProfile(data.name, data.description)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        editProfilePopup.close();
      })
      .catch(console.log)
      .finally(() => editProfilePopup.renderLoading(false));
  },
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (data) => {
    addCardPopup.renderLoading(true);
    api
      .addCard(data["place-name"], data.link)
      .then((card) => {
        cardList.addItem(createCard(card));
        addCardPopup.close();
      })
      .catch(console.log)
      .finally(() => addCardPopup.renderLoading(false));
  },
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelector: "#avatar-popup",
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar(data.avatar)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        avatarPopup.close();
      })
      .catch(console.log)
      .finally(() => avatarPopup.renderLoading(false));
  },
});
avatarPopup.setEventListeners();

/* ---------- VALIDACIÓN ---------- */

const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#avatar-form"),
);
avatarFormValidator.enableValidation();

const editProfileBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const avatarEditBtn = document.querySelector(".profile__avatar-container");

editProfileBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  document.querySelector(".popup__input_type_name").value = data.name;
  document.querySelector(".popup__input_type_description").value = data.job;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addCardBtn.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

avatarEditBtn.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});
