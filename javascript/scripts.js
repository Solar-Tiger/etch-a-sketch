/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
const gridResetBtn = document.querySelector('.reset-grid');
const opacityToggleBtn = document.querySelector('.opacity-toggle-btn');
const customGridColor = document.querySelector('.custom-grid-color');
const userSelectedOpacity = document.querySelector('.user-selected-opacity');
const opacitySlider = document.querySelector('.opacity-slider');
const customOpacityDisplay = document.querySelector('.custom-opacity-display');
const toggleGridBordersBtn = document.querySelector('.toggle-borders-btn');

let userSelectedColor;
let opacityToggle = 'opacity off';
let gridBordersToggle = 'grids on';

createEtchASketchGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquare();
fillEtchASketchSquareTouch();
getSelectedColor();

changeGridSizeBtn.addEventListener('click', () => {
  const userGridSizeChoice = parseInt(
    prompt('Please pick a number between 2 and 100'),
    10
  );
  if (userGridSizeChoice >= 2 && userGridSizeChoice <= 100) {
    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }

    createEtchASketchGrid(userGridSizeChoice);

    etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

    opacityMap.clear();

    fillEtchASketchSquare();
    fillEtchASketchSquareTouch();
  } else {
    alert('Incorrect, try again');
    return 0;
  }
});

gridResetBtn.addEventListener('click', () => {
  resetGrid();
  fillEtchASketchSquare();
  fillEtchASketchSquareTouch();
});

function createEtchASketchGrid(gridSize) {
  let newGridSize = gridSize;

  if (!gridSize) {
    newGridSize = 5;

    userSelectedColor = 'black';

    customOpacityDisplay.style.background = `rgb(${0}, ${0}, ${0}, ${
      opacitySlider.value
    })`;
  }

  gridContainer.style.setProperty('--square-size', newGridSize);

  for (let i = 0; i < newGridSize * newGridSize; i++) {
    const gridDiv = document.createElement('div');

    gridDiv.classList.add('etch-a-sketch-square');

    gridContainer.appendChild(gridDiv);
  }
}

function fillEtchASketchSquare() {
  etchASketchSquare.forEach((square) => {
    let opacity;

    if (opacityToggle === 'opacity off') {
      opacity = opacitySlider.value;
    } else if (opacityToggle === 'opacity on') {
      opacity = 0.1;
    }

    const storedColor = userSelectedColor;

    if (storedColor !== userSelectedColor && opacity === 'opacity on') {
      opacity = 0.1;
    } else if (storedColor !== userSelectedColor && opacity === 'opacity off') {
      opacity = 1;
    }

    square.addEventListener('mouseenter', (e) => {
      applySelectedColor(e.target, userSelectedColor, opacity);

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
let mySquare = null;
let touchOpacity;
let opacityMap = new Map();

function touchStart(e) {
  previousSquare = e.target;
  mySquare = e.target;

  if (!opacityMap.has(previousSquare) && opacityToggle === 'opacity on') {
    opacityMap.set(previousSquare, 0.1);
  }

  if (opacityToggle === 'opacity off') {
    touchOpacity = opacitySlider.value;
  } else if (opacityToggle === 'opacity on') {
    touchOpacity = opacityMap.get(previousSquare);
  }

  applySelectedColor(e.target, userSelectedColor, touchOpacity);

  if (opacityMap.get(previousSquare) < 1 && opacityToggle === 'opacity on') {
    opacityMap.set(previousSquare, opacityMap.get(previousSquare) + 0.1);
  }
}

function touchMove(e) {
  e.preventDefault();

  const touchedSquare = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );

  previousSquare = touchedSquare;

  if (!opacityMap.has(previousSquare) && opacityToggle === 'opacity on') {
    opacityMap.set(previousSquare, 0.1);
  }

  if (opacityToggle === 'opacity off') {
    touchOpacity = opacitySlider.value;
  } else if (opacityToggle === 'opacity on') {
    touchOpacity = opacityMap.get(previousSquare);
  }

  if (
    touchedSquare &&
    touchedSquare.classList.contains('etch-a-sketch-square')
  ) {
    const currentSquare = touchedSquare;

    if (currentSquare !== mySquare) {
      applySelectedColor(currentSquare, userSelectedColor, touchOpacity);

      if (
        opacityMap.get(previousSquare) < 1 &&
        opacityToggle === 'opacity on'
      ) {
        opacityMap.set(previousSquare, opacityMap.get(previousSquare) + 0.1);
      }

      mySquare = currentSquare;
    }
  }
}

function touchEnd() {
  gridContainer.addEventListener('touchend', (e) => {
    e.preventDefault();
    mySquare = null;
  });
}

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 256);
  return randomNumber;
}

function getRandomColorWithOpacity(opacity) {
  const rainbow = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, ${opacity})`;
  return rainbow;
}

function getSelectedColor() {
  const selectedColor = document.querySelectorAll('.colors');
  selectedColor.forEach((color) => {
    color.addEventListener('click', () => {
      if (color.classList[0] === 'red') {
        userSelectedColor = 'red';

        customOpacityDisplay.style.background = `rgba(${255}, ${0}, ${0}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'orange') {
        userSelectedColor = 'orange';

        customOpacityDisplay.style.background = `rgba(${255}, ${165}, ${0}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'yellow') {
        userSelectedColor = 'yellow';

        customOpacityDisplay.style.background = `rgba(${255}, ${255}, ${0}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'green') {
        userSelectedColor = 'green';

        customOpacityDisplay.style.background = `rgba(${0}, ${128}, ${0}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'blue') {
        userSelectedColor = 'blue';

        customOpacityDisplay.style.background = `rgba(${0}, ${0}, ${255}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'purple') {
        userSelectedColor = 'purple';

        customOpacityDisplay.style.background = `rgba(${128}, ${0}, ${128}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'black') {
        userSelectedColor = 'black';

        customOpacityDisplay.style.background = `rgba(${0}, ${0}, ${0}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'white') {
        userSelectedColor = 'white';

        customOpacityDisplay.style.background = `rgba(${255}, ${255}, ${255}, ${
          opacitySlider.value
        })`;
      } else if (color.classList[0] === 'rainbow') {
        userSelectedColor = 'rainbow';

        let colorRed = `rgba(255, 0, 0, ${opacitySlider.value})`;
        let colorOrange = `rgba(255, 165, 0, ${opacitySlider.value})`;
        let colorYellow = `rgba(255, 255, 0, ${opacitySlider.value})`;
        let colorGreen = `rgba(0, 128, 0, ${opacitySlider.value})`;
        let colorBlue = `rgba(0, 0, 255, ${opacitySlider.value})`;
        let colorPurple = `rgba(128, 0, 128, ${opacitySlider.value})`;

        let rainbowBackground = `linear-gradient(to top right, ${colorRed}, ${colorOrange}, ${colorYellow}, ${colorGreen}, ${colorBlue}, ${colorPurple})`;

        customOpacityDisplay.style.background = rainbowBackground;
      }

      console.log(userSelectedColor, customOpacityDisplay.style.background);

      if (userCustomGridColor !== null) {
        userCustomGridColor = null;
      }

      opacityMap.clear();
      fillEtchASketchSquare();
      fillEtchASketchSquareTouch();
    });
  });
}

function getSelectedColorAndOpacity(squareOpacity) {
  if (userSelectedColor === 'red') {
    return `rgb(${255}, ${0}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'orange') {
    return `rgb(${255}, ${165}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'yellow') {
    return `rgb(${255}, ${255}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'green') {
    return `rgb(${0}, ${128}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'blue') {
    return `rgb(${0}, ${0}, ${255}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'purple') {
    return `rgb(${128}, ${0}, ${128}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'black') {
    return `rgb(${0}, ${0}, ${0}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'white') {
    return `rgb(${255}, ${255}, ${255}, ${squareOpacity})`;
  }
  if (userSelectedColor === 'rainbow') {
    return 'rainbow';
  }
  if (squareOpacity) {
    customOpacityDisplay.style.background = `rgb(${0}, ${0}, ${0}, ${
      opacitySlider.value
    })`;
  }
}

let userCustomGridColor = null;

customGridColor.addEventListener('input', () => {
  userCustomGridColor = customGridColor.value;

  customOpacityDisplay.style.background = customGridColor.value;
});

customGridColor.addEventListener('change', () => {
  userSelectedColor = 'custom grid color';

  opacityMap.clear();
  fillEtchASketchSquare();
  fillEtchASketchSquareTouch();
});

function getCustomGridColor(newSquareOpacity) {
  const r = parseInt(userCustomGridColor.slice(1, 3), 16);
  const g = parseInt(userCustomGridColor.slice(3, 5), 16);
  const b = parseInt(userCustomGridColor.slice(5, 7), 16);

  return `rgb(${r}, ${g}, ${b}, ${newSquareOpacity})`;
}

function applySelectedColor(
  targetSquare,
  currentlySelectedColor,
  currentOpacity
) {
  if (currentlySelectedColor === 'rainbow') {
    targetSquare.style.background = getRandomColorWithOpacity(currentOpacity);
  } else if (currentlySelectedColor === 'custom grid color') {
    targetSquare.style.background = getCustomGridColor(currentOpacity);
  } else {
    targetSquare.style.background = getSelectedColorAndOpacity(currentOpacity);
  }
}

function getCustomOpacity() {
  opacitySlider.addEventListener('input', () => {
    userSelectedOpacity.textContent = opacitySlider.value;

    if (userCustomGridColor !== null) {
      customOpacityDisplay.style.background = getCustomGridColor(
        opacitySlider.value
      );
    } else {
      customOpacityDisplay.style.background = getSelectedColorAndOpacity(
        opacitySlider.value
      );
    }
  });
}

getCustomOpacity();

function resetGrid() {
  etchASketchSquare.forEach((square) => {
    const blankSquare = square;

    blankSquare.style.background = `rgb(${255}, ${255}, ${255})`;

    opacityMap.clear();
  });
}

function toggleOpacity() {
  opacityToggleBtn.addEventListener('click', () => {
    const opacitySelection = document.querySelector('.opacity-display');

    if (opacitySelection.textContent === 'Opacity off') {
      opacitySelection.textContent = 'Opacity on';
      opacityToggle = 'opacity on';
    } else {
      opacitySelection.textContent = 'Opacity off';
      opacityToggle = 'opacity off';
    }

    opacityMap.clear();
    fillEtchASketchSquare();
    fillEtchASketchSquareTouch();
  });
}

toggleOpacity();

function toggleGridBorders() {
  toggleGridBordersBtn.addEventListener('click', () => {
    if (gridBordersToggle === 'grids on') {
      etchASketchSquare.forEach((square) => {
        square.classList.add('etch-a-sketch-square-no-border');
      });

      console.log('off');

      gridBordersToggle = 'grids off';
    } else if (gridBordersToggle === 'grids off') {
      etchASketchSquare.forEach((square) => {
        square.classList.remove('etch-a-sketch-square-no-border');
      });

      console.log('on');

      gridBordersToggle = 'grids on';
    }
  });
}

toggleGridBorders();
