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

function createNewGrid() {
  let gridSize = 4;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('etch-a-sketch-square');
    // gridDiv.style.flexBasis = `${960 / gridSize}px`;
    // gridDiv.style.flexShrink = '1';
    gridDiv.style.aspectRatio = '1/1';
    gridDiv.style.flex = `0 1 ${960 / gridSize}px`;
    // gridDiv.style.height = `${960 / gridSize}px`;
    gridContainer.appendChild(gridDiv);
  }
}

function createUserNewGrid(userGridInput) {
  for (let i = 0; i < userGridInput * userGridInput; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('etch-a-sketch-square');
    gridDiv.style.width = `${960 / userGridInput}px`;
    gridDiv.style.height = `${960 / userGridInput}px`;
    gridContainer.appendChild(gridDiv);
  }
}

function fillEtchASketchSquare() {
  etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');
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
