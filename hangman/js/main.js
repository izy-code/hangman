import { createNode } from './util.js';
import { gallowsNode } from './gallows.js';

const mainNode = createNode('main', 'main-content');
const headingNode = createNode('h1', 'main-content__title');

headingNode.textContent = 'Hangman game';
mainNode.append(headingNode, gallowsNode);

document.body.append(mainNode);
