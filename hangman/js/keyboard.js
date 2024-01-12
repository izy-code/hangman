import { createNode } from './util.js';

const CHAR_CODE_A = 65;
const CHAR_CODE_Z = 90;

const keyboardNode = createNode('div', 'quiz__keyboard');

const resetKeyboard = () => {
  for (let keyNode of keyboardNode.children) {
    keyNode.classList.remove('quiz__key--selected');
  }
};

for (let charCode = CHAR_CODE_A; charCode <= CHAR_CODE_Z; charCode++) {
  const keyNode = createNode('button', 'quiz__key');
  const keyLetter = String.fromCharCode(charCode);

  keyNode.textContent = keyLetter;
  keyboardNode.append(keyNode);
}

keyboardNode.addEventListener('click', (evt) => {
  const keyNode = evt.target.closest('.quiz__key');

  if (keyNode) {
    keyNode.classList.add('quiz__key--selected');
  }
});

export { keyboardNode, resetKeyboard };
