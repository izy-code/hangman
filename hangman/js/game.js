import { data } from './data.js';
import { attemptsMax } from './gallows.js';
import { showModal, closeModal } from './modal.js';
import { initQuiz, resetQuiz, setGuessesCount } from './quiz.js';

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

const checkLetter = (guessedLetters) => {

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
  console.log(`Answer: ${answer}`);

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    closeModal();
    resetQuiz(answer, question);
  }
};

export { startGame, checkLetter };
