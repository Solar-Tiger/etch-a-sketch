/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
const gridResetBtn = document.querySelector('.reset-grid');
let userGridSizeChoice;
let gridSize = 5;
let userSelectedColor;

createNewGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquare();
fillEtchASketchSquareTouch();
getSelectedColor();

changeGridSizeBtn.addEventListener('click', () => {
  userGridSizeChoice = parseInt(
    prompt('Please pick a number between 2 and 100'),
    10
  );
  if (userGridSizeChoice >= 2 && userGridSizeChoice <= 100) {
    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }

    createUserNewGrid(userGridSizeChoice);

    etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

    fillEtchASketchSquare();
    fillEtchASketchSquareTouch();
  } else {
    alert('Incorrect, try again');
    return 0;
  }
});

gridResetBtn.addEventListener('click', () => {
  resetGrid();
});

function createNewGrid() {
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
    let opacity = 0.1;

    square.addEventListener('mouseenter', (e) => {
      // e.target.style.backgroundColor = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()},${opacity})`;

      e.target.style.backgroundColor = userSelectedColor;

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

function touchStart(e) {
  if (userSelectedColor === 'rainbow') {
    e.target.style.backgroundColor = getRandomColor();
  } else {
    e.target.style.backgroundColor = userSelectedColor;
  }

  previousSquare = e.target;
}

function touchMove(e) {
  e.preventDefault();

  const touchedSquare = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );

  if (
    touchedSquare &&
    touchedSquare.classList.contains('etch-a-sketch-square')
  ) {
    const currentSquare = touchedSquare;

    if (currentSquare !== previousSquare) {
      // currentSquare.style.backgroundColor = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;

      if (userSelectedColor === 'rainbow') {
        currentSquare.style.backgroundColor = getRandomColor();
      }

      currentSquare.style.backgroundColor = userSelectedColor;

      previousSquare = currentSquare;
    }
  }
}

function touchEnd() {
  gridContainer.addEventListener('touchend', (e) => {
    e.preventDefault();

    previousSquare = null;
  });
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256);

  return randomNumber;
}

function getRandomColor() {
  let rainbow = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;

  return rainbow;
}

function resetGrid() {
  etchASketchSquare.forEach((square) => {
    square.style.backgroundColor = `rgb(${255}, ${255}, ${255})`;
  });
}

function getSelectedColor() {
  let selectedColor = document.querySelectorAll('.colors');

  selectedColor.forEach((color) => {
    color.addEventListener('click', () => {
      if (color.classList[0] === 'red') {
        userSelectedColor = `rgb(${255}, ${0}, ${0})`;
      } else if (color.classList[0] === 'orange') {
        userSelectedColor = `rgb(${255}, ${165}, ${0})`;
      } else if (color.classList[0] === 'yellow') {
        userSelectedColor = `rgb(${255}, ${255}, ${0})`;
      } else if (color.classList[0] === 'green') {
        userSelectedColor = `rgb(${0}, ${128}, ${0})`;
      } else if (color.classList[0] === 'blue') {
        userSelectedColor = `rgb(${0}, ${0}, ${255})`;
      } else if (color.classList[0] === 'purple') {
        userSelectedColor = `rgb(${128}, ${0}, ${128})`;
      } else if (color.classList[0] === 'black') {
        userSelectedColor = `rgb(${0}, ${0}, ${0})`;
      } else if (color.classList[0] === 'white') {
        userSelectedColor = `rgb(${255}, ${255}, ${255})`;
      } else if (color.classList[0] === 'rainbow') {
        userSelectedColor = 'rainbow';
      }
    });
  });
}
