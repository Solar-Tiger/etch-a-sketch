const gridContainer = document.querySelector('.grid-container');

for (let i = 0; i < 16; i++) {
  const gridDiv = document.createElement('div');
  gridDiv.classList.add('etch-a-sketch-square');

  gridContainer.appendChild(gridDiv);
}

const etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

console.log(etchASketchSquare);

etchASketchSquare.forEach((square) => {
  square.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = 'green';
  });
});
