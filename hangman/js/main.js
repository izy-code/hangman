import { createNode } from './util.js';
import { gallowsNode } from './gallows.js';
import { initQuiz } from './quiz.js';

const mainNode = createNode('main', 'main-content');
const headingNode = createNode('h1', 'main-content__title');
const quizNode = initQuiz('cat', 'Animal with four legs');

headingNode.textContent = 'Hangman game';
mainNode.append(headingNode, gallowsNode, quizNode);

document.body.append(mainNode);
