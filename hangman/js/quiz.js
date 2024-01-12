import { createNode } from './util.js';
import { partsNumberToName } from './gallows.js';
import { keyboardNode, resetKeyboard } from './keyboard.js';

const attemptsMax = Object.keys(partsNumberToName).length;

const quizNode = createNode('section', 'quiz');
const wordNode = createNode('ol', 'quiz__letters');
const questionNode = createNode('h2', 'quiz__question');
const guessesNode = createNode('p', 'quiz__guesses');
const guessesCountNode = createNode('span', 'quiz__count');

const createLetters = (word) => {
  for (let i = 0; i < word.length; i++) {
    const letterNode = createNode('li', 'quiz__letter');

    wordNode.append(letterNode);
  }
};

const setGuessesCount = (guessNumber) => {
  guessesCountNode.textContent = `${guessNumber} / ${attemptsMax}`;
};

const resetQuiz = (answer, question, isInitial = false) => {
  if (!isInitial) {
    wordNode.innerHTML = '';
    resetKeyboard();
  }

  createLetters(answer);
  questionNode.textContent = question;
  setGuessesCount(0);

  return quizNode;
};

const initQuiz = (answer, question) => {
  resetQuiz(answer, question, true);

  guessesNode.textContent = 'Incorrect guesses: ';
  guessesNode.append(guessesCountNode);

  quizNode.append(wordNode, questionNode, guessesNode, keyboardNode);

  return quizNode;
};

export { initQuiz, resetQuiz };
