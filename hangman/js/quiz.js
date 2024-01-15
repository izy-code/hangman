import { createNode } from './util.js';
import { mistakesMax } from './gallows.js';
import { keyboardNode, resetKeyboard } from './keyboard.js';

const quizNode = createNode('section', 'quiz');
const wordNode = createNode('ol', 'quiz__letters');
const questionNode = createNode('h2', 'quiz__question');
const guessesNode = createNode('p', 'quiz__guesses');
const guessesCountNode = createNode('span', 'quiz__count');

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

const setGuessesCount = (guessNumber) => {
  guessesCountNode.textContent = `${guessNumber} / ${mistakesMax}`;
};

const resetQuiz = (answer, question, isInitial = false) => {
  if (!isInitial) {
    wordNode.innerHTML = '';
    resetKeyboard();
  }

  createLetters(answer);
  questionNode.textContent = question;
  setGuessesCount(0);
};

const initQuiz = (answer, question) => {
  resetQuiz(answer, question, true);

  guessesNode.textContent = 'Incorrect guesses: ';
  guessesNode.append(guessesCountNode);
  quizNode.append(wordNode, questionNode, guessesNode, keyboardNode);
};

export { quizNode, initQuiz, resetQuiz, showLetter, setGuessesCount };
