/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
let userGridSizeChoice;
let gridSize = 4;

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
  // let gridSize = 4;
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
  e.target.style.backgroundColor = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
}

let previousSquare = null;

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

function autoChangeGridSize() {
  let windowWidth = window.screen.width;

  if (windowWidth > 360 && windowWidth < 767) {
    const gridDiv = document.querySelectorAll('.etch-a-sketch-square');

    gridContainer.style.width = '300px';
    gridContainer.style.height = '300px';

    gridDiv.forEach((div) => {
      div.style.width = `${gridContainer.clientWidth / gridSize}px`;
      div.style.height = `${gridContainer.clientHeight / gridSize}px`;
    });
  }
}

const mediaQuery = window.matchMedia(
  '(min-width: 300px) and (max-width: 767px)'
);

const mediaQueryTwo = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);

const mediaQueryThree = window.matchMedia(
  '(min-width: 1280px) and (max-width: 1920px)'
);

function handleTabletChange(e) {
  if (e.matches) {
    const gridDiv = document.querySelectorAll('.etch-a-sketch-square');

    gridContainer.style.width = '300px';
    gridContainer.style.height = '300px';

    gridDiv.forEach((div) => {
      div.style.width = `${gridContainer.clientWidth / gridSize}px`;
      div.style.height = `${gridContainer.clientHeight / gridSize}px`;
    });
  }
}

function handleTabletChangeTwo(e) {
  if (e.matches) {
    const gridDiv = document.querySelectorAll('.etch-a-sketch-square');

    gridContainer.style.width = '650px';
    gridContainer.style.height = '650px';

    gridDiv.forEach((div) => {
      div.style.width = `${gridContainer.clientWidth / gridSize}px`;
      div.style.height = `${gridContainer.clientHeight / gridSize}px`;
    });
  }
}

function handleTabletChangeThree(e) {
  if (e.matches) {
    const gridDiv = document.querySelectorAll('.etch-a-sketch-square');

    gridContainer.style.width = '1150px';
    gridContainer.style.height = '1150px';

    gridDiv.forEach((div) => {
      div.style.width = `${gridContainer.clientWidth / gridSize}px`;
      div.style.height = `${gridContainer.clientHeight / gridSize}px`;
    });
  }
}

mediaQuery.addEventListener('change', handleTabletChange);
mediaQueryTwo.addEventListener('change', handleTabletChangeTwo);
mediaQueryThree.addEventListener('change', handleTabletChangeThree);
