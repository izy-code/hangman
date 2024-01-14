import { data } from './data.js';
import { attemptsMax, showBodyPart } from './gallows.js';
import { showModal, closeModal } from './modal.js';
import { initQuiz, resetQuiz, showLetter, setGuessesCount } from './quiz.js';

let excludedIndexes = [];
let currentAnswer = '';
let mistakesCount = 0;

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
  const guessCount = guessedLetters.length;
  const guessedLetter = guessedLetters[guessCount - 1];

  if (currentAnswer.includes(guessedLetter)) {
    currentAnswer.split('').forEach((char, index) => {
      if (char === guessedLetter) {
        showLetter(index, guessedLetter);
      }
    });
  } else {
    setGuessesCount(++mistakesCount);
    showBodyPart(mistakesCount);
  }

  if (mistakesCount === attemptsMax) {
  }

  if (guessCount === currentAnswer.length) {
  }
};

const startGame = (isInitial) => {
  if (isInitial) {
    excludedIndexes.push(+localStorage.getItem('izyQuestionIndex'));
  }

  const randomIndex = getRandomIndex();
  const { answer, question } = data[randomIndex];

  currentAnswer = answer.toUpperCase();
  excludedIndexes.push(randomIndex);
  localStorage.setItem('izyQuestionIndex', randomIndex);
  console.log(`Answer: ${answer}`);

  if (excludedIndexes.length === data.length) {
    excludedIndexes = [randomIndex];
  }

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    closeModal();
    resetQuiz(answer, question);
  }
};

export { startGame, checkLetter };
