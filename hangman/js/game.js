import { data } from './data.js';
import { attemptsMax, showBodyPart, resetGallows } from './gallows.js';
import { onDocumentKeydown } from './keyboard.js';
import { showModal } from './modal.js';
import { initQuiz, resetQuiz, showLetter, setGuessesCount } from './quiz.js';

let excludedDataIndexes = [];
let currentAnswer = '';
let shownLettersCount = 0;
let mistakesCount = 0;

const getRandomIndex = () => {
  const availableDataIndexes = data.reduce((acc, item, index) => {
    if (!excludedDataIndexes.includes(index)) {
      acc.push(index);
    }
    return acc;
  }, []);

  return availableDataIndexes[
    Math.floor(Math.random() * availableDataIndexes.length)
  ];
};

const checkLetter = (guessedLetters) => {
  const guessCount = guessedLetters.length;
  const guessedLetter = guessedLetters[guessCount - 1];

  if (currentAnswer.includes(guessedLetter)) {
    currentAnswer.split('').forEach((char, index) => {
      if (char === guessedLetter) {
        showLetter(index, guessedLetter);
        shownLettersCount++;
      }
    });
  } else {
    setGuessesCount(++mistakesCount);
    showBodyPart(mistakesCount);
  }

  if (shownLettersCount === currentAnswer.length) {
    showModal(true, currentAnswer);
  }

  if (mistakesCount === attemptsMax) {
    showModal(false, currentAnswer);
  }
};

const startGame = (isInitial) => {
  if (isInitial) {
    excludedDataIndexes.push(+localStorage.getItem('izyDataIndex'));
  }

  const randomIndex = getRandomIndex();
  const { answer, question } = data[randomIndex];

  console.clear();
  console.log('Ensure your keyboard is set to the English layout.');
  console.log(`Answer: ${answer}`);

  currentAnswer = answer.toUpperCase();
  excludedDataIndexes.push(randomIndex);
  localStorage.setItem('izyDataIndex', randomIndex);
  shownLettersCount = 0;
  mistakesCount = 0;
  document.addEventListener('keydown', onDocumentKeydown);

  if (excludedDataIndexes.length === data.length) {
    excludedDataIndexes = [randomIndex];
  }

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    resetQuiz(answer, question);
    resetGallows();
  }
};

export { startGame, checkLetter };
