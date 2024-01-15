import { data } from './data.js';
import { mistakesMax, showBodyPart, resetGallows } from './gallows.js';
import { onDocumentKeydown } from './keyboard.js';
import { showEndingModal } from './modal.js';
import { initQuiz, resetQuiz, showLetter, setGuessesCount } from './quiz.js';

const LOCAL_STORAGE_KEY = 'izyDataIndex';

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

const addDataIndex = (newDataIndex) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, newDataIndex);
  excludedDataIndexes.push(newDataIndex);

  if (excludedDataIndexes.length === data.length) {
    excludedDataIndexes = [newDataIndex];
  }
};

const showConsoleMessages = (answer) => {
  console.clear();
  console.log('Ensure your keyboard is set to the English layout.');
  console.log(`Answer: ${answer}`);
};

const checkLetter = (guessedLetters) => {
  const guessCount = guessedLetters.length;
  const guessedLetter = guessedLetters[guessCount - 1];

  if (currentAnswer.includes(guessedLetter)) {
    currentAnswer.split('').forEach((letter, index) => {
      if (letter === guessedLetter) {
        showLetter(index, guessedLetter);
        shownLettersCount++;
      }
    });
  } else {
    setGuessesCount(++mistakesCount);
    showBodyPart(mistakesCount);
  }

  if (shownLettersCount === currentAnswer.length) {
    showEndingModal(true, currentAnswer);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  if (mistakesCount === mistakesMax) {
    showEndingModal(false, currentAnswer);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const startGame = (isInitial) => {
  if (isInitial) {
    excludedDataIndexes.push(+localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const randomIndex = getRandomIndex();
  const { answer, question } = data[randomIndex];

  addDataIndex(randomIndex);
  showConsoleMessages(answer);
  currentAnswer = answer.toUpperCase();
  shownLettersCount = 0;
  mistakesCount = 0;

  document.addEventListener('keydown', onDocumentKeydown);

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    resetQuiz(answer, question);
    resetGallows();
  }
};

export { startGame, checkLetter };
