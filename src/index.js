import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Validation settings
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Enable validation
enableValidation(validationSettings);