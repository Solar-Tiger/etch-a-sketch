/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
const gridResetBtn = document.querySelector('.reset-grid');
let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');
let userSelectedColor;

createNewGrid();
fillEtchASketchSquare();
fillEtchASketchSquareTouch();
getSelectedColor();

changeGridSizeBtn.addEventListener('click', () => {
  let userGridSizeChoice = parseInt(
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

gridResetBtn.addEventListener('click', () => {
  resetGrid();
});

function createNewGrid() {
  let gridSize = 5;

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
      if (userSelectedColor === 'rainbow') {
        e.target.style.backgroundColor = getRandomColor();
      } else {
        e.target.style.backgroundColor = getSelectedColorAndOpacity(opacity);
      }

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
  if (userSelectedColor === 'rainbow') {
    e.target.style.backgroundColor = getRandomColor();
  } else {
    e.target.style.backgroundColor = userSelectedColor;
  }

  previousSquare = e.target;
}

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
      // currentSquare.style.backgroundColor = `rgba(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;

      if (userSelectedColor === 'rainbow') {
        currentSquare.style.backgroundColor = getRandomColor();
      }

      currentSquare.style.backgroundColor = userSelectedColor;

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

function getRandomColor() {
  let rainbow = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;

  return rainbow;
}

function getRandomColorWithOpacity(opacity) {
  let rainbow = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, ${opacity})`;

  return rainbow;
}

function resetGrid() {
  etchASketchSquare.forEach((square) => {
    square.style.backgroundColor = `rgb(${255}, ${255}, ${255})`;
  });
}

function getSelectedColor() {
  let selectedColor = document.querySelectorAll('.colors');

  selectedColor.forEach((color) => {
    color.addEventListener('click', () => {
      if (color.classList[0] === 'red') {
        userSelectedColor = `rgb(${255}, ${0}, ${0})`;
      } else if (color.classList[0] === 'orange') {
        userSelectedColor = `rgb(${255}, ${165}, ${0})`;
      } else if (color.classList[0] === 'yellow') {
        userSelectedColor = `rgb(${255}, ${255}, ${0})`;
      } else if (color.classList[0] === 'green') {
        userSelectedColor = `rgb(${0}, ${128}, ${0})`;
      } else if (color.classList[0] === 'blue') {
        userSelectedColor = `rgb(${0}, ${0}, ${255})`;
      } else if (color.classList[0] === 'purple') {
        userSelectedColor = `rgb(${128}, ${0}, ${128})`;
      } else if (color.classList[0] === 'black') {
        userSelectedColor = `rgb(${0}, ${0}, ${0})`;
      } else if (color.classList[0] === 'white') {
        userSelectedColor = `rgb(${255}, ${255}, ${255})`;
      } else if (color.classList[0] === 'rainbow') {
        userSelectedColor = 'rainbow';
      }
    });
  });
}

let mySelectedColor;

function getSelectedColorAndOpacity(newOpacity) {
  let selectedColor = document.querySelectorAll('.colors');

  selectedColor.forEach((color) => {
    color.addEventListener('click', () => {
      if (color.classList[0] === 'red') {
        mySelectedColor = `rgb(${255}, ${0}, ${0}, ${newOpacity})`;
      }
      if (color.classList[0] === 'orange') {
        mySelectedColor = `rgb(${255}, ${165}, ${0}, ${newOpacity})`;
      }
      if (color.classList[0] === 'yellow') {
        mySelectedColor = `rgb(${255}, ${255}, ${0}, ${newOpacity})`;
      }
      if (color.classList[0] === 'green') {
        mySelectedColor = `rgb(${0}, ${128}, ${0}, ${newOpacity})`;
      }
      if (color.classList[0] === 'blue') {
        mySelectedColor = `rgb(${0}, ${0}, ${255}, ${newOpacity})`;
      }
      if (color.classList[0] === 'purple') {
        mySelectedColor = `rgb(${128}, ${0}, ${128}, ${newOpacity})`;
      }
      if (color.classList[0] === 'black') {
        mySelectedColor = `rgb(${0}, ${0}, ${0}, ${newOpacity})`;
      }
      if (color.classList[0] === 'white') {
        mySelectedColor = `rgb(${255}, ${255}, ${255}, ${newOpacity})`;
      }
      if (color.classList[0] === 'rainbow') {
        mySelectedColor = 'rainbow';
      }
    });
  });

  return mySelectedColor;
}

const gridSquare = document.querySelectorAll('.square');
const btns = document.querySelectorAll('.color');

let color;

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'Red') {
      color = 'red';
    } else if (btn.textContent === 'Blue') {
      color = 'blue';
    }
  });
});

gridSquare.forEach((square) => {
  let opacity = 0.1;
  square.addEventListener('mouseenter', () => {
    square.style.backgroundColor = changedColor(opacity);
    if (opacity < 1) {
      opacity += 0.1;
    }
  });
});

function changedColor(updated) {
  if (color === 'red') {
    return `rgb(${255}, ${0}, ${0}, ${updated})`;
  }
  if (color === 'blue') {
    return `rgb(${0}, ${0}, ${255}, ${updated})`;
  }
}
