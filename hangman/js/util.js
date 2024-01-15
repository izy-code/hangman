const createNode = (tagName, classNames, attribsObject, isSVG = false) => {
  let newNode;

  if (isSVG) {
    newNode = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    newNode = document.createElement(tagName);
  }

  if (classNames) {
    newNode.setAttribute('class', classNames);
  }

  if (typeof attribsObject === 'object') {
    for (const attribute in attribsObject) {
      newNode.setAttribute(attribute, attribsObject[attribute]);
    }
  }

  return newNode;
};

/* Function for custom CSS properties cubic-bezier eased transition, because <use href="..."> SVG
doesn't support properties transitions in styles */
const animateValue = (startValue, endValue, duration, callback) => {
  const startTime = performance.now();

  const update = () => {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = progress * progress * (3 - 2 * progress);
    const animatedValue = startValue + (endValue - startValue) * easedProgress;

    callback(animatedValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

export { createNode, animateValue };
