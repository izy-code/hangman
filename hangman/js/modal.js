import { createNode } from './util.js';
import { startGame } from './game.js';

const OPACITY_TRANSITION_TIME_MS = 600;

const modalNode = createNode('div', 'modal modal--closed');
const contentNode = createNode('div', 'modal__content');
const titleNode = createNode('h2', 'modal__title');
const textNode = createNode('p', 'modal__text');
const buttonNode = createNode('button', 'modal__button', { type: 'button' });

const handleModalShow = () => {
  setTimeout(() => {
    buttonNode.focus();
    modalNode.classList.add('modal--opaque');
  }, 0);

  modalNode.classList.remove('modal--closed');
  document.body.classList.add('no-scroll');
};

const showEndingModal = (isWin, answer) => {
  modalNode.classList.remove('modal--keyboard');

  if (isWin) {
    titleNode.classList.add('modal__title--win');
    titleNode.textContent = 'You guessed correctly!';
  } else {
    titleNode.classList.add('modal__title--fail');
    titleNode.textContent = 'Your guess was wrong';
  }

  textNode.textContent = `The answer is: ${answer.toUpperCase()}`;
  buttonNode.textContent = 'Play again!';
  handleModalShow();
};

const showKeyboardModal = () => {
  modalNode.classList.add('modal--keyboard');
  titleNode.classList.add('modal__title--fail');
  titleNode.textContent = 'Wrong key or layout';
  textNode.textContent =
    'Please use the alphabetic keys on the English keyboard layout';
  buttonNode.textContent = 'OK';
  handleModalShow();
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  modalNode.addEventListener('click', onModalClick);
};

const closeModal = () => {
  modalNode.classList.remove('modal--opaque');

  setTimeout(() => {
    modalNode.classList.add('modal--closed');
    titleNode.classList.remove('modal__title--win');
    titleNode.classList.remove('modal__title--fail');
    document.body.classList.remove('no-scroll');
  }, OPACITY_TRANSITION_TIME_MS);

  if (!modalNode.classList.contains('modal--keyboard')) {
    startGame(false);
  } else {
    document.removeEventListener('keydown', onDocumentEscapeKeydown);
    modalNode.removeEventListener('click', onModalClick);
  }
};

function onDocumentEscapeKeydown(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

function onModalClick(evt) {
  if (!evt.composedPath().includes(contentNode)) {
    closeModal();
  }
}

buttonNode.addEventListener('click', closeModal);

contentNode.append(titleNode, textNode, buttonNode);
modalNode.append(contentNode);

export { modalNode, showEndingModal, closeModal, showKeyboardModal };
