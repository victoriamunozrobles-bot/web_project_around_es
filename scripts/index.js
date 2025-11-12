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

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
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

function getCardElement(name = "Sin título", link = "images/placeholder.jpg") {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTtitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardItem = cardElement.querySelector(".card");

  cardImage.alt = name;
  cardImage.src = link;
  cardTtitle.textContent = name;

  return cardItem;
}

function renderCard(name, link, container) {
  const newCardElement = getCardElement(name, link);
  container.append(newCardElement);
}

editProfileBtn.addEventListener("click", function (evt) {
  handleOpenedEditModal();
});

closeModalBtn.addEventListener("click", function (evt) {
  closeModal(editModal);
});

editModal.addEventListener("submit", handleProfileFormSubmit);
