import { createNode } from './util.js';
import { gallowsNode } from './gallows.js';
import { quizNode } from './quiz.js';
import { modalNode } from './modal.js';
import { startGame } from './game.js';

const mainNode = createNode('main', 'main-content');
const headingNode = createNode('h1', 'main-content__title');

headingNode.textContent = 'Hangman game';
startGame(true);
mainNode.append(headingNode, gallowsNode, quizNode, modalNode);

document.body.append(mainNode);

setTimeout(() => {
  alert('Ensure your keyboard is set to the English layout.');
}, 250);
