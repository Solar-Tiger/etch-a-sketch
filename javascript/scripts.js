/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-container');

let gridSizeChoice = 16;

for (let i = 0; i < gridSizeChoice * gridSizeChoice; i++) {
  const gridDiv = document.createElement('div');
  gridDiv.classList.add('etch-a-sketch-square');
  gridDiv.style.width = `${800 / gridSizeChoice}px`;
  gridDiv.style.height = `${800 / gridSizeChoice}px`;

  gridContainer.appendChild(gridDiv);
}

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
