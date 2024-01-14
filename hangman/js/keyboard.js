import { createNode } from './util.js';
import { checkLetter } from './game.js';
import { showKeyboardLayoutModal } from './modal.js';

const CHAR_CODE_A = 65;
const CHAR_CODE_Z = 90;

const keyboardNode = createNode('div', 'quiz__keyboard keyboard');

let guessedLetters = [];

const resetKeyboard = () => {
  for (let keyNode of keyboardNode.children) {
    keyNode.removeAttribute('disabled');
  }

  guessedLetters = [];
};

const handleKeyPress = (keyNode) => {
  keyNode.setAttribute('disabled', '');
  guessedLetters.push(keyNode.textContent);
  checkLetter(guessedLetters);
};

for (let charCode = CHAR_CODE_A; charCode <= CHAR_CODE_Z; charCode++) {
  const keyNode = createNode('button', 'keyboard__key', { type: 'button' });
  const keyLetter = String.fromCharCode(charCode);

  keyNode.textContent = keyLetter;
  keyboardNode.append(keyNode);
}

keyboardNode.addEventListener('click', (evt) => {
  const keyNode = evt.target.closest('.keyboard__key:not(:disabled)');

  if (keyNode) {
    handleKeyPress(keyNode);
  }
});

document.addEventListener('keydown', (evt) => {
  const keyValue = evt.key.toUpperCase();

  if (/^[A-Z]$/.test(keyValue)) {
    if (!guessedLetters.includes(keyValue)) {
      const pressedKeyNode = [...keyboardNode.children].find(
        (keyNode) => keyNode.textContent === keyValue
      );

      handleKeyPress(pressedKeyNode);
    }
  } else {
    if (evt.key !== 'Escape') {
      showKeyboardLayoutModal();
    }
  }
});

export { keyboardNode, resetKeyboard };
