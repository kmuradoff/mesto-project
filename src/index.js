import './pages/index.css';
import { createCard, deleteCard, handlLikeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { getUserInfo, getInitialCards, updateUserCard, addNewCards, updateUserAvatar } from './scripts/api';

const cardTemplate = document.querySelector("#card-template");

const placeList = document.querySelector(".places__list");

const modals = document.querySelectorAll('.popup');
const profilePopupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const newCardNameInput = newCardForm.elements['place-name'];
const newCardLinkInput = newCardForm.elements.link;

const imagePopup = document.querySelector('.popup_type_image');
const cardImage = imagePopup.querySelector('.popup__image');
const cardCaption = imagePopup.querySelector('.popup__caption');


const popupCloseButtons = document.querySelectorAll('.popup__close');

const newAvatarButton = document.querySelector('.profile__image-button');
const newAvatar = document.querySelector('.popup_type_new-avatar');
const newAvatarForm = document.forms['new-avatar'];
const newAvatarInput = newAvatarForm.elements.link

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error", 
    errorClass: "popup__error_visible", 
};

let myId = "";

function handlOpenImagePopup(link, name) {
    cardImage.src = link;
    cardImage.alt = name;
    cardCaption.textContent = name;
    openModal(imagePopup)
}

function handlProfileSubmit(evt) {
    evt.preventDefault();

    const button = profileForm.querySelector(".popup__button");
    button.textContent = "Сохранение...";

    updateUserCard(profileNameInput.value, profileDescriptionInput.value).then(userData => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(profilePopupEdit);
    })
    .catch(function (err) {
        console.error("Ошибка при выполнении запроса:", err);
        alert("Возникла ошибка. Пожалуйста, попробуйте снова.");
    })
    .finally(function () {
        button.textContent = "Сохранить";
    });
}

function handlNewCardSubmit(evt) {
    evt.preventDefault();

    const button = newCardForm.querySelector(".popup__button");
    button.textContent = "Сохранение...";

    addNewCards(newCardNameInput.value, newCardLinkInput.value)
    .then(function(newCardData) {
        const newCardElement = createCard (
        cardTemplate,
        myId,
        newCardData,
        deleteCard,
        handlOpenImagePopup,
        handlLikeCard
        )
    
        placeList.prepend(newCardElement);
        newCardForm.reset();
        closeModal(newCardPopup);
    })
    .catch(function (err) {
        console.error("Ошибка при выполнении запроса:", err);
        alert("Возникла ошибка. Пожалуйста, попробуйте снова.");
    })
    .finally(function () {
        button.textContent = "Сохранить";
    });
}

function handlNewAvatarForm(evt) {
    evt.preventDefault();

    const button = newAvatarForm.querySelector(".popup__button");
    button.textContent = "Сохранение...";

    updateUserAvatar(newAvatarInput.value)
    .then(function (userData) {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(newAvatar);
        newAvatarForm.reset();
    })
    .catch(function (err) {
        console.error("Ошибка при выполнении запроса:", err);
        alert("Возникла ошибка. Пожалуйста, попробуйте снова.");
    })
    .finally(function () {
        button.textContent = "Сохранить";
    });
}

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    myId = userData._id;

    cards.forEach((card) => {
    const cardElement = createCard(
        cardTemplate,
        myId,
        card,
        deleteCard,
        handlOpenImagePopup,
        handlLikeCard
);

    placeList.append(cardElement);
    });
})
.catch((err) => {
    console.error("Ошибка при выполнении запроса:", err);
    alert("Возникла ошибка. Пожалуйста, попробуйте снова.");
});

modals.forEach(modal => {
    modal.classList.add('popup_is-animated')
});

newAvatarButton.addEventListener("click", () => {
    newAvatarForm.reset();
    clearValidation(newAvatarForm, validationConfig);
    openModal(newAvatar);
});

profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profilePopupEdit)
});

newCardButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    openModal(newCardPopup)
});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        const modal = evt.target.closest('.popup');
        closeModal(modal)
    });
})

profileForm.addEventListener('submit', handlProfileSubmit);
newCardForm.addEventListener('submit', handlNewCardSubmit);
newAvatarForm.addEventListener('submit', handlNewAvatarForm);

enableValidation(validationConfig);