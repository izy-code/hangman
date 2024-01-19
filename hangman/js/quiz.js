import { createNode } from './util.js';
import { mistakesMax } from './gallows.js';
import { keyboardNode, resetKeyboard } from './keyboard.js';

const quizNode = createNode('section', 'quiz');
const wordNode = createNode('ol', 'quiz__letters');
const questionNode = createNode('h2', 'quiz__question');
const mistakesNode = createNode('p', 'quiz__mistakes');
const mistakesCountNode = createNode('span', 'quiz__count');

const createLetters = (word) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < word.length; i++) {
    const letterNode = createNode('li', 'quiz__letter');

    fragment.append(letterNode);
  }

  wordNode.append(fragment);
};

const showLetter = (index, letter) => {
  const letterNode = wordNode.children[index];

  letterNode.textContent = letter;
  letterNode.style.borderBottom = 'none';
};

const setMistakesCount = (mistakesCount) => {
  mistakesCountNode.textContent = `${mistakesCount} / ${mistakesMax}`;
};

const resetQuiz = (answer, question, isInitial = false) => {
  if (!isInitial) {
    wordNode.innerHTML = '';
    resetKeyboard();
  }

  createLetters(answer);
  questionNode.textContent = question;
  setMistakesCount(0);
};

const initQuiz = (answer, question) => {
  resetQuiz(answer, question, true);

  mistakesNode.textContent = 'Incorrect guesses: ';
  mistakesNode.append(mistakesCountNode);
  quizNode.append(wordNode, questionNode, mistakesNode, keyboardNode);
};

export { quizNode, initQuiz, resetQuiz, showLetter, setMistakesCount };
