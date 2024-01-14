import { createNode, animateValue } from './util.js';

const partsNumberToName = {
  1: 'head',
  2: 'body',
  3: 'left-arm',
  4: 'right-arm',
  5: 'left-leg',
  6: 'right-leg',
};
const attemptsMax = Object.keys(partsNumberToName).length;

const gallowsNode = createNode(
  'svg',
  'gallows',
  {
    width: '370',
    height: '590',
    role: 'img',
    'aria-label': 'Gallows with hangman',
  },
  true
);
const svgUseNode = createNode(
  'use',
  'gallows__use',
  {
    href: './img/gallows.svg#game-picture',
    'aria-hidden': 'true',
  },
  true
);

const showBodyPart = (partNumber) => {
  animateValue(0, 1, 1200, (value) => {
    gallowsNode.style.setProperty(
      `--${partsNumberToName[partNumber]}-opacity`,
      value
    );
  });
};

const resetGallows = () => {
  animateValue(1, 0, 1200, (value) => {
    Object.values(partsNumberToName).forEach((partName) => {
      gallowsNode.style.setProperty(`--${partName}-opacity`, value);
    });
  });
};

gallowsNode.append(svgUseNode);

export { attemptsMax, gallowsNode, showBodyPart, resetGallows };
