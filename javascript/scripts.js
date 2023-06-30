/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-container');
const changeGridSize = document.querySelector('.change-grid-size');

let gridSizeChoice = 8;

for (let i = 0; i < gridSizeChoice * gridSizeChoice; i++) {
  const gridDiv = document.createElement('div');
  gridDiv.classList.add('etch-a-sketch-square');
  gridDiv.style.width = `${960 / gridSizeChoice}px`;
  gridDiv.style.height = `${960 / gridSizeChoice}px`;

  gridContainer.appendChild(gridDiv);
}

changeGridSize.addEventListener('click', () => {
  let userGridSizeChoice = parseInt(
    prompt('Please input a grid size number between 2 and 100')
  );

  if (userGridSizeChoice < 2) {
    return 0;
  }

  if (userGridSizeChoice > 100) {
    return 0;
  }

  for (let i = 0; i < userGridSizeChoice * userGridSizeChoice; i++) {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('etch-a-sketch-square');
    gridDiv.style.width = `${960 / userGridSizeChoice}px`;
    gridDiv.style.height = `${960 / userGridSizeChoice}px`;

    gridContainer.appendChild(gridDiv);
  }
});

const etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

etchASketchSquare.forEach((square) => {
  let opacity = 0.1;

  square.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = `rgba(${255}, ${99}, ${71}, ${opacity})`;

    if (opacity < 1) {
      opacity += 0.1;
    }
  });
});
