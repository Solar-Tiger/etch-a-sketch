/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
const gridResetBtn = document.querySelector('.reset-grid');
const opacityBtn = document.querySelector('.opacity-toggle');
const customGridColor = document.querySelector('.custom-grid-color');
let userSelectedColor;
let currentOpacity = 'opacity off';

createNewGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquare();
fillEtchASketchSquareTouch();
getSelectedColor();

changeGridSizeBtn.addEventListener('click', () => {
  let userGridSizeChoice = parseInt(
    prompt('Please pick a number between 2 and 100'),
    10
  );
  if (userGridSizeChoice >= 2 && userGridSizeChoice <= 100) {
    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }

    createUserNewGrid(userGridSizeChoice);

    etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

    opacityMap.clear();

    fillEtchASketchSquare();
    fillEtchASketchSquareTouch();
  } else {
    alert('Incorrect, try again');
    return 0;
  }
});

gridResetBtn.addEventListener('click', () => {
  resetGrid();
  fillEtchASketchSquare();
  fillEtchASketchSquareTouch();
});

function createNewGrid() {
  let gridSize = 5;

  gridContainer.style.setProperty('--square-size', gridSize);

  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridDiv = document.createElement('div');

    gridDiv.classList.add('etch-a-sketch-square');

    gridContainer.appendChild(gridDiv);
  }
}

function createUserNewGrid(userGridInput) {
  gridContainer.style.setProperty('--square-size', userGridInput);

  for (let i = 0; i < userGridInput * userGridInput; i++) {
    const gridDiv = document.createElement('div');

    gridDiv.classList.add('etch-a-sketch-square');

    gridContainer.appendChild(gridDiv);
  }
}

function fillEtchASketchSquare() {
  etchASketchSquare.forEach((square) => {
    let opacity;

    if (currentOpacity === 'opacity off') {
      opacity = 1;
    } else if (currentOpacity === 'opacity on') {
      opacity = 0.1;
    }

    let storedColor = userSelectedColor;

    if (storedColor !== userSelectedColor && opacity === 'opacity on') {
      opacity = 0.1;
    } else if (storedColor !== userSelectedColor && opacity === 'opacity off') {
      opacity = 1;
    }

    square.addEventListener('mouseenter', (e) => {
      applySelectedColor(e.target, userSelectedColor, opacity);

      if (opacity < 1) {
        opacity += 0.1;
      }
    });
  });
}

function fillEtchASketchSquareTouch() {
  etchASketchSquare.forEach((square) => {
    square.addEventListener('touchstart', touchStart);
    square.addEventListener('touchmove', touchMove);
    square.addEventListener('touchend', touchEnd);
  });
}

let previousSquare;
let mySquare = null;
let touchOpacity;
let opacityMap = new Map();

function touchStart(e) {
  previousSquare = e.target;
  mySquare = e.target;

  if (!opacityMap.has(previousSquare) && currentOpacity === 'opacity on') {
    opacityMap.set(previousSquare, 0.1);
  }

  if (currentOpacity === 'opacity off') {
    touchOpacity = 1;
  } else if (currentOpacity === 'opacity on') {
    touchOpacity = opacityMap.get(previousSquare);
  }

  applySelectedColor(e.target, userSelectedColor, touchOpacity);

  if (opacityMap.get(previousSquare) < 1 && currentOpacity === 'opacity on') {
    opacityMap.set(previousSquare, opacityMap.get(previousSquare) + 0.1);
  }
}

function touchMove(e) {
  e.preventDefault();

  const touchedSquare = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );

  previousSquare = touchedSquare;

  if (!opacityMap.has(previousSquare) && currentOpacity === 'opacity on') {
    opacityMap.set(previousSquare, 0.1);
  }

  if (currentOpacity === 'opacity off') {
    touchOpacity = 1;
  } else if (currentOpacity === 'opacity on') {
    touchOpacity = opacityMap.get(previousSquare);
  }

  if (
    touchedSquare &&
    touchedSquare.classList.contains('etch-a-sketch-square')
  ) {
    const currentSquare = touchedSquare;

    if (currentSquare !== mySquare) {
      applySelectedColor(currentSquare, userSelectedColor, touchOpacity);

      if (
        opacityMap.get(previousSquare) < 1 &&
        currentOpacity === 'opacity on'
      ) {
        opacityMap.set(previousSquare, opacityMap.get(previousSquare) + 0.1);
      }

      mySquare = currentSquare;
    }
  }
}
function touchEnd() {
  gridContainer.addEventListener('touchend', (e) => {
    e.preventDefault();
    mySquare = null;
  });
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256);
  return randomNumber;
}

function getRandomColorWithOpacity(opacity) {
  let rainbow = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, ${opacity})`;
  return rainbow;
}

function getSelectedColor() {
  let selectedColor = document.querySelectorAll('.colors');
  selectedColor.forEach((color) => {
    color.addEventListener('click', () => {
      if (color.classList[0] === 'red') {
        userSelectedColor = 'red';
      } else if (color.classList[0] === 'orange') {
        userSelectedColor = 'orange';
      } else if (color.classList[0] === 'yellow') {
        userSelectedColor = 'yellow';
      } else if (color.classList[0] === 'green') {
        userSelectedColor = 'green';
      } else if (color.classList[0] === 'blue') {
        userSelectedColor = 'blue';
      } else if (color.classList[0] === 'purple') {
        userSelectedColor = 'purple';
      } else if (color.classList[0] === 'black') {
        userSelectedColor = 'black';
      } else if (color.classList[0] === 'white') {
        userSelectedColor = 'white';
      } else if (color.classList[0] === 'rainbow') {
        userSelectedColor = 'rainbow';
      }

      opacityMap.clear();
      fillEtchASketchSquare();
      fillEtchASketchSquareTouch();
    });
  });
}

function getSelectedColorAndOpacity(squareOpacity) {
  if (userSelectedColor === 'red') {
    return `rgb(${255}, ${0}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'orange') {
    return `rgb(${255}, ${165}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'yellow') {
    return `rgb(${255}, ${255}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'green') {
    return `rgb(${0}, ${128}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'blue') {
    return `rgb(${0}, ${0}, ${255}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'purple') {
    return `rgb(${128}, ${0}, ${128}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'black') {
    return `rgb(${0}, ${0}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'white') {
    return `rgb(${255}, ${255}, ${255}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'rainbow') {
    return 'rainbow';
  }
}

let userCustomGridColor;

customGridColor.addEventListener('input', () => {
  userCustomGridColor = customGridColor.value;
});

customGridColor.addEventListener('change', () => {
  userSelectedColor = 'custom grid color';

  opacityMap.clear();
  fillEtchASketchSquare();
  fillEtchASketchSquareTouch();
});

function getCustomGridColor(newSquareOpacity) {
  const r = parseInt(userCustomGridColor.slice(1, 3), 16);
  const g = parseInt(userCustomGridColor.slice(3, 5), 16);
  const b = parseInt(userCustomGridColor.slice(5, 7), 16);

  return `rgb(${r}, ${g}, ${b}, ${newSquareOpacity})`;
}

function applySelectedColor(
  targetSquare,
  currentlySelectedColor,
  currentOpacity
) {
  if (currentlySelectedColor === 'rainbow') {
    targetSquare.style.backgroundColor =
      getRandomColorWithOpacity(currentOpacity);
  } else if (currentlySelectedColor === 'custom grid color') {
    targetSquare.style.backgroundColor = getCustomGridColor(currentOpacity);
  } else {
    targetSquare.style.backgroundColor =
      getSelectedColorAndOpacity(currentOpacity);
  }
}

function resetGrid() {
  etchASketchSquare.forEach((square) => {
    let blankSquare = square;

    blankSquare.style.backgroundColor = `rgb(${255}, ${255}, ${255})`;

    opacityMap.clear();
  });
}

function toggleOpacity() {
  opacityBtn.addEventListener('click', () => {
    let opacitySelection = document.querySelector('.opacity-display');

    if (opacitySelection.textContent === 'Opacity off') {
      opacitySelection.textContent = 'Opacity on';
      currentOpacity = 'opacity on';
    } else {
      opacitySelection.textContent = 'Opacity off';
      currentOpacity = 'opacity off';
    }

    opacityMap.clear();
    fillEtchASketchSquare();
    fillEtchASketchSquareTouch();
  });
}

toggleOpacity();
