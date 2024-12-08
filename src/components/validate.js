export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(form => {
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, settings);
      toggleButtonState(form, button, settings);
    });
  });
}

function checkInputValidity(input, settings) {
  const errorElement = input.nextElementSibling;
  if (!input.validity.valid) {
    showError(input, errorElement, settings);
  } else {
    hideError(input, errorElement, settings);
  }
}

function showError(input, errorElement, settings) {
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
  input.classList.add(settings.inputErrorClass);
}

function hideError(input, errorElement, settings) {
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  input.classList.remove(settings.inputErrorClass);
}

function toggleButtonState(form, button, settings) {
  if (form.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(settings.inactiveButtonClass);
  }
} 