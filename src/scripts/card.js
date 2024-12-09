import { removeCard, likeCard } from './api';

function createCard(cardTemplate, userId, element, delFunc, popupOpenFunc, likeFunc) {
    const template = cardTemplate.content;
    const cardElement = template.querySelector(".places__item").cloneNode(true);
    const likeCount = cardElement.querySelector('.card__like-count');

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.setAttribute("src", element.link);
    cardImage.setAttribute("alt", element.name);
    cardElement.querySelector(".card__title").textContent = element.name;
    likeCount.textContent = element.likes ? element.likes.length : 0;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector('.card__like-button');

    const isLikeCard = element.likes.some(el => el['_id'] === userId);

    // Проверка владельца карточки
    if (userId !== element.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener("click", () => {
            delFunc(cardElement, element._id);
        });
    }

    // Установка активного класса, если лайк уже есть
    if (isLikeCard) {
        likeButton.classList.add("card__like-button_is-active");
    }

    // Обработка клика по лайку
    likeButton.addEventListener('click', () => {
        likeFunc(likeButton, element._id, likeCount);
    });

    // Обработка клика по изображению
    cardImage.addEventListener('click', () => {
        popupOpenFunc(element.link, element.name);
    });

    return cardElement;
}

function deleteCard(cardElement, id) {
    removeCard(id)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => {
            console.error("Ошибка при удалении карточки:", error);
        });
}

function handlLikeCard(button, id, countElement) {
    const isLiked = button.classList.contains("card__like-button_is-active");

    likeCard(id, isLiked)
        .then(data => {
            button.classList.toggle("card__like-button_is-active", !isLiked);
            countElement.textContent = data.likes.length;
        })
        .catch(error => {
            console.error("Ошибка при обновлении лайков:", error);
        });
}

export { createCard, deleteCard, handlLikeCard };