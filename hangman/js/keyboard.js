import { createNode } from './util.js';
import { checkGuessedLetter } from './game.js';
import { showKeyboardModal } from './modal.js';

const CHAR_CODE_A = 65;
const CHAR_CODE_Z = 90;
const ALLOWED_KEYS = [
  'Alt',
  'Backspace',
  'CapsLock',
  'ContextMenu',
  'Control',
  'Enter',
  'Meta',
  'Shift',
  ' ',
  'Tab',
  'Escape',
  'F5',
  'F12',
  'Delete',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
];

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
  checkGuessedLetter(guessedLetters.at(-1));
};

const onDocumentKeydown = (evt) => {
  const keyValue = evt.key.toUpperCase();

  if (/^[A-Z]$/.test(keyValue)) {
    if (!guessedLetters.includes(keyValue)) {
      const pressedKeyNode = [...keyboardNode.children].find(
        (keyNode) => keyNode.textContent === keyValue
      );

      handleKeyPress(pressedKeyNode);
    }
  } else if (!ALLOWED_KEYS.includes(evt.key)) {
    showKeyboardModal();
  }
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

export { keyboardNode, resetKeyboard, onDocumentKeydown };
