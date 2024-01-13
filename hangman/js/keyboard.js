import { createNode } from './util.js';

const CHAR_CODE_A = 65;
const CHAR_CODE_Z = 90;

const keyboardNode = createNode('div', 'quiz__keyboard keyboard');

const resetKeyboard = () => {
  for (let keyNode of keyboardNode.children) {
    keyNode.removeAttribute('disabled');
  }
};

for (let charCode = CHAR_CODE_A; charCode <= CHAR_CODE_Z; charCode++) {
  const keyNode = createNode('button', 'keyboard__key', { type: 'button' });
  const keyLetter = String.fromCharCode(charCode);

  keyNode.textContent = keyLetter;
  keyboardNode.append(keyNode);
}

keyboardNode.addEventListener('click', (evt) => {
  const keyNode = evt.target.closest('.keyboard__key');

  if (keyNode) {
    keyNode.setAttribute('disabled', '');
  }
});

export { keyboardNode, resetKeyboard };
