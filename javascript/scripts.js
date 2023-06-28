const gridContainer = document.querySelector('.grid-container');

for (let i = 0; i < 16; i++) {
  const gridDiv = document.createElement('div');

  gridContainer.appendChild(gridDiv);
}
