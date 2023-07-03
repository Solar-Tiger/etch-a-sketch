/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
let userGridSizeChoice;

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
  let gridSize = 4;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('etch-a-sketch-square');
    gridDiv.style.width = `${gridContainer.clientWidth / gridSize}px`;
    gridDiv.style.height = `${gridContainer.clientHeight / gridSize}px`;
    gridContainer.appendChild(gridDiv);
  }
}

function createUserNewGrid(userGridInput) {
  for (let i = 0; i < userGridInput * userGridInput; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('etch-a-sketch-square');
    gridDiv.style.width = `${gridContainer.clientWidth / userGridInput}px`;
    gridDiv.style.height = `${gridContainer.clientHeight / userGridInput}px`;
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

function touchStart(e) {
  changeBackgronudColor(e.target);
}

let previousSquare = null;

function touchMove(e) {
  e.preventDefault();

  const touchedSquare = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );

  if (touchedSquare && e.target.classList.contains('etch-a-sketch-square')) {
    const currentSquare = touchedSquare;

    if (currentSquare !== previousSquare) {
      changeBackgronudColor(currentSquare);
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

function changeBackgronudColor(color) {
  let randomColor = color;

  randomColor.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256);

  return randomNumber;
}

const mediaQuery = window.matchMedia('(min-width: 768px');

function handleTabletChange(e) {
  if (e.matches) {
    console.log('It matched, sir');
  }
}

mediaQuery.addEventListener('change', handleTabletChange);

handleTabletChange(mediaQuery);
