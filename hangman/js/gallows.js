import { createNode, animateValue } from './util.js';

const OPACITY_TRANSITION_TIME_MS = 600;

const partsNumberToName = {
  1: 'head',
  2: 'body',
  3: 'left-arm',
  4: 'right-arm',
  5: 'left-leg',
  6: 'right-leg',
};
const mistakesMax = Object.keys(partsNumberToName).length;

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
  animateValue(0, 1, OPACITY_TRANSITION_TIME_MS, (value) => {
    gallowsNode.style.setProperty(
      `--${partsNumberToName[partNumber]}-opacity`,
      value
    );
  });
};

const resetGallows = () => {
  const bodyParts = Object.values(partsNumberToName);
  const shownBodyParts = bodyParts.filter((partName) => {
    const partOpacity = getComputedStyle(gallowsNode).getPropertyValue(
      `--${partName}-opacity`
    );

    return partOpacity !== '0';
  });

  shownBodyParts.forEach((partName) => {
    animateValue(1, 0, OPACITY_TRANSITION_TIME_MS, (value) => {
      gallowsNode.style.setProperty(`--${partName}-opacity`, value);
    });
  });
};

gallowsNode.append(svgUseNode);

export { mistakesMax, gallowsNode, showBodyPart, resetGallows };
