import { createNode } from './util.js';

const modalNode = createNode('div', 'modal modal--closed');
const contentNode = createNode('div', 'modal__content');
const titleNode = createNode('h2', 'modal__title');
const answerNode = createNode('p', 'modal__answer');
const buttonNode = createNode('button', 'modal__restart', { type: 'button' });

const showModal = (isWin, answer) => {
  if (isWin) {
    titleNode.classList.add('modal__title--win');
    titleNode.textContent = 'You guessed correctly!';
  } else {
    titleNode.classList.add('modal__title--fail');
    titleNode.textContent = 'Your guess was wrong';
  }

  answerNode.textContent = `The answer is: ${answer}`;
  modalNode.classList.remove('modal--closed');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalNode.classList.add('modal--closed');
  titleNode.classList.remove('modal__title--win');
  titleNode.classList.remove('modal__title--fail');
  document.body.style.overflow = '';
};

buttonNode.textContent = 'Play again!';
buttonNode.addEventListener('click', closeModal);

contentNode.append(titleNode, answerNode, buttonNode);
modalNode.append(contentNode);

export { modalNode, showModal, closeModal };
