function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('mousedown', handlCloseByOverlay);
    document.addEventListener('keydown', handlCloseByEscape);
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('mousedown', handlCloseByOverlay);
    document.removeEventListener('keydown', handlCloseByEscape);
};

function handlCloseByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target)
    }
};

function handlCloseByEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'))
    }
}

export { openModal, closeModal };