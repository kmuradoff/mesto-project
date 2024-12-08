// @todo: Темплейт карточки

// @todo: DOM узлы

// Select the template and the list where cards will be added
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Select the pop-ups
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Select the profile elements
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Select the form and its fields
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Select the form and its fields for adding a new card
const cardFormElement = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

// Select the buttons
const editButton = document.querySelector('.profile__edit-button');
const closeButton = profilePopup.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

// Add animation class to all pop-ups for smooth transitions
document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// Function to create a card
function createCard(cardData) {
  // Clone the template
  const cardElement = cardTemplate.cloneNode(true);

  // Select elements within the card
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Set the card data
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Add event listener for the like button
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Add event listener for the delete button
  deleteButton.addEventListener('click', () => {
    const cardToDelete = deleteButton.closest('.card');
    cardToDelete.remove();
  });

  // Add event listener for the card image
  cardImage.addEventListener('click', () => {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  // Return the filled card element
  return cardElement;
}

// Function to render initial cards
function renderInitialCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData);
    placesList.append(cardElement);
  });
}

// Render the cards on page load
renderInitialCards(initialCards);
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Function to open a modal
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

// Function to close a modal
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

// Function to open the profile edit modal and pre-fill the form
function openProfileEditModal() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

// Function to handle form submission
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Prevent the default form submission behavior

    // Update the profile information
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    // Close the modal
    closeModal(profilePopup);
}

// Function to open the card addition modal and clear the form
function openCardAddModal() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
}

// Function to handle card form submission
function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Prevent the default form submission behavior

    // Create a new card with the input data
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const newCardElement = createCard(newCardData);

    // Add the new card to the beginning of the list
    placesList.prepend(newCardElement);

    // Close the modal
    closeModal(cardPopup);
}

// Function to toggle the save button state
function toggleSaveButtonState(form, button) {
    if (form.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__button_disabled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('popup__button_disabled');
    }
}

// Function to show error message
function showError(input, errorMessage) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

// Function to hide error message
function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
}

// Function to check input validity
function checkInputValidity(input) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage);
    } else {
        hideError(input);
    }
}

// Function to toggle the save button state for the card form
function toggleCardSaveButtonState() {
    const saveButton = cardFormElement.querySelector('.popup__button');
    if (cardFormElement.checkValidity()) {
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove('popup__button_disabled');
    } else {
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__button_disabled');
    }
}

// Add event listeners to validate inputs on input
cardNameInput.addEventListener('input', () => {
    checkInputValidity(cardNameInput);
    toggleCardSaveButtonState();
});
cardLinkInput.addEventListener('input', () => {
    checkInputValidity(cardLinkInput);
    toggleCardSaveButtonState();
});

// Event listeners
editButton.addEventListener('click', openProfileEditModal);
closeButton.addEventListener('click', () => closeModal(profilePopup));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', openCardAddModal);
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Event listener for closing the image pop-up
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// Add event listeners to close pop-ups by clicking on the overlay
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
});

// Function to close pop-up with Escape key
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

