import { data } from './data.js';
import { mistakesMax, showBodyPart, resetGallows } from './gallows.js';
import { onDocumentKeydown } from './keyboard.js';
import { showEndingModal } from './modal.js';
import { initQuiz, resetQuiz, showLetter, setMistakesCount } from './quiz.js';

const LOCAL_STORAGE_KEY = 'izyDataIndex';

let excludedDataIndexes = [];
let currentAnswer = '';
let shownLettersCount = 0;
let mistakesCount = 0;

const getRandomIndex = () => {
  const availableDataIndexes = [...data.keys()].filter(
    (index) => !excludedDataIndexes.includes(index)
  );

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

const checkGuessedLetter = (guessedLetter) => {
  if (currentAnswer.includes(guessedLetter)) {
    currentAnswer.split('').forEach((letter, index) => {
      if (letter === guessedLetter) {
        showLetter(index, guessedLetter);
        shownLettersCount++;
      }
    });
  } else {
    setMistakesCount(++mistakesCount);
    showBodyPart(mistakesCount);
  }

  if (shownLettersCount === currentAnswer.length) {
    showEndingModal(true, currentAnswer);
  }

  if (mistakesCount === mistakesMax) {
    showEndingModal(false, currentAnswer);
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

  if (isInitial) {
    initQuiz(answer, question);
  } else {
    resetQuiz(answer, question);
    resetGallows();
    shownLettersCount = 0;
    mistakesCount = 0;
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

export { startGame, checkGuessedLetter };
