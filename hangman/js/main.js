import { createNode } from './util.js';
import { gallowsNode } from './gallows.js';
import { initQuiz } from './quiz.js';
import { modalNode } from './modal.js';

const mainNode = createNode('main', 'main-content');
const headingNode = createNode('h1', 'main-content__title');
const quizNode = initQuiz('cat', 'Animal with four legs');

headingNode.textContent = 'Hangman game';
mainNode.append(headingNode, gallowsNode, quizNode, modalNode);

document.body.append(mainNode);

setTimeout(() => {
  alert('Ensure your keyboard is set to the English layout.');
}, 250);
