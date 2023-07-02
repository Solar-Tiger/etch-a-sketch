/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
let userGridSizeChoice;

createNewGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquare();

changeGridSizeBtn.addEventListener('click', () => {
  userGridSizeChoice = parseInt(
    prompt('Please pick a number between 2 and 100')
  );
  if (userGridSizeChoice >= 2 && userGridSizeChoice <= 100) {
    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }
    createUserNewGrid(userGridSizeChoice);
    fillEtchASketchSquare();
  } else {
    alert('Incorrect, try again');
    return 0;
  }
});

gridContainer.addEventListener('touchstart', (e) => {
  e.preventDefault();

  changeBackgronudColor(e.target);
});

let previousSquare = null;

etchASketchSquare.forEach((square) => {
  square.addEventListener('touchmove', (e) => {
    e.preventDefault();

    const elem = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );

    if (elem && e.target.classList.contains('etch-a-sketch-square')) {
      const currentSquare = elem;

      if (currentSquare !== previousSquare) {
        changeBackgronudColor(currentSquare);
        previousSquare = currentSquare;
      }
    }
  });
});

gridContainer.addEventListener('touchend', (e) => {
  e.preventDefault();

  previousSquare = null;
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
      e.target.style.backgroundColor = `rgba(${255}, ${99}, ${71}, ${opacity})`;
      if (opacity < 1) {
        opacity += 0.1;
      }
    });
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
