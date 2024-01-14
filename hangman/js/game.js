import { data } from './data.js';
import { partsNumberToName } from './gallows.js';
import { showModal, closeModal } from './modal.js';
import { initQuiz, resetQuiz } from './quiz.js';

const attemptsMax = Object.keys(partsNumberToName).length;

let excludedIndexes = [];
let currentAnswer = '';

const getRandomIndex = () => {
  const availableIndexes = data.reduce((acc, item, index) => {
    if (!excludedIndexes.includes(index)) {
      acc.push(index);
    }
    return acc;
  }, []);

  return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
};

const startGame = (isInitial) => {
  if (isInitial) {
    excludedIndexes.push(+localStorage.getItem('lastQuestionIndex'));
  }

  const randomIndex = getRandomIndex();
  const { answer, question } = data[randomIndex];

  currentAnswer = answer;
  excludedIndexes.push(randomIndex);
  localStorage.setItem('lastQuestionIndex', randomIndex);

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    closeModal();
    resetQuiz(answer, question);
  }

  console.log(`Answer: ${answer}`);
};

export { startGame };
