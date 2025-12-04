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
