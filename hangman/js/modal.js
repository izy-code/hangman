import { createNode } from './util.js';
import { startGame } from './game.js';

const modalNode = createNode('div', 'modal modal--closed');
const contentNode = createNode('div', 'modal__content');
const titleNode = createNode('h2', 'modal__title');
const answerNode = createNode('p', 'modal__answer');
const buttonNode = createNode('button', 'modal__restart', { type: 'button' });

const handleModalShow = () => {
  setTimeout(() => {
    buttonNode.focus();
  }, 0);

  modalNode.classList.remove('modal--closed');
  document.body.classList.add('no-scroll');
};

const showModal = (isWin, answer) => {
  modalNode.classList.remove('modal--keyboard');

  if (isWin) {
    titleNode.classList.add('modal__title--win');
    titleNode.textContent = 'You guessed correctly!';
  } else {
    titleNode.classList.add('modal__title--fail');
    titleNode.textContent = 'Your guess was wrong';
  }

  answerNode.textContent = `The answer is: ${answer.toUpperCase()}`;
  buttonNode.textContent = 'Play again!';
  handleModalShow();
};

const showKeyboardModal = () => {
  modalNode.classList.add('modal--keyboard');
  titleNode.classList.add('modal__title--fail');
  titleNode.textContent = 'Wrong key or layout';
  answerNode.textContent =
    'Please use the alphabetic keys on the English keyboard layout';
  buttonNode.textContent = 'OK';
  handleModalShow();
};

const closeModal = () => {
  modalNode.classList.add('modal--closed');
  titleNode.classList.remove('modal__title--win');
  titleNode.classList.remove('modal__title--fail');
  document.body.classList.remove('no-scroll');

  if (!modalNode.classList.contains('modal--keyboard')) {
    startGame(false);
  }
};

buttonNode.addEventListener('click', closeModal);

contentNode.append(titleNode, answerNode, buttonNode);
modalNode.append(contentNode);

export { modalNode, showModal, closeModal, showKeyboardModal };
