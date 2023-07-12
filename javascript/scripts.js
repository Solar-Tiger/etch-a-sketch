/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
let userGridSizeChoice;
let gridSize = 3;

createNewGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquare();
fillEtchASketchSquareTouch();

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
      e.target.style.backgroundColor = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()},${opacity})`;

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
  e.target.style.backgroundColor = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;

  previousSquare = e.target;
}

// let previousSquare = null;

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
      currentSquare.style.backgroundColor = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;

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
