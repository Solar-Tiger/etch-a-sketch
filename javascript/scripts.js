/* eslint-disable prefer-const */

// ---------------------------------------------------------------------------
//                             ETCH-A-SKETCH LOGIC
// ---------------------------------------------------------------------------

// VARIOUS DEFAULT VARIABLES TO RUN ETCH-A-SKETCH LOGIC

const gridContainer = document.querySelector('.grid-square-container');
const changeGridSizeBtn = document.querySelector('.change-grid-size-btn');
const clearGridBtn = document.querySelector('.clear-grid-btn');
const opacityToggleBtn = document.querySelector('.opacity-toggle-btn');
const customGridColor = document.querySelector('.custom-grid-color');
const userSelectedOpacity = document.querySelector('.user-selected-opacity');
const opacitySlider = document.querySelector('.opacity-slider');
const customOpacityDisplay = document.querySelector('.custom-opacity-display');
const toggleGridBordersBtn = document.querySelector('.toggle-borders-btn');

// VARIABLES USED TO CONTROL CURRENT SELECTED COLOR, IF OPACITY GOES FROM 0.1 TO 1 EACH TIME YOU HOVER OVER A SQUARE/TOUCH A SQUARE AND SHOW OR HIDE THE GRID SQUARES

let userSelectedColor;
let opacityToggle = 'opacity off';
let gridBordersToggle = 'grids on';

// CREATE THE ETCH-A-SKECTH GRID AND ALLOW MOUSE MOVEMENT WHEN HOVERED OVER A SQUARE OR TOUCH INPUT ON EACH SQUARE FROM A USER ON A MOBILE DEVICE

createEtchASketchGrid();

let etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

fillEtchASketchSquareMouse();
fillEtchASketchSquareTouch();
getSelectedColor();

changeGridSizeBtn.addEventListener('click', () => {
  const userGridSizeChoice = parseInt(
    prompt('Please pick a number between 2 and 100'),
    10
  );
  if (userGridSizeChoice >= 2 && userGridSizeChoice <= 100) {
    // THIS ANSWER WAS FOUND ON STACK OVERFLOW FOR REMOVING THE GRID SQUARES BEFORE APPLYING NEW ONES

    while (gridContainer.lastElementChild) {
      gridContainer.removeChild(gridContainer.lastElementChild);
    }

    createEtchASketchGrid(userGridSizeChoice);

    etchASketchSquare = document.querySelectorAll('.etch-a-sketch-square');

    opacityMap.clear();

    fillEtchASketchSquareMouse();
    fillEtchASketchSquareTouch();
  }
});

clearGridBtn.addEventListener('click', () => {
  clearGrid();
});

function createEtchASketchGrid(gridSize) {
  let newGridSize = gridSize;

  // IF STATEMENT TO DETERMINE DEFAULT SETTINGS ON PAGE LOAD FOR GRID SIZE, CURRENT SELECTED COLOR AND CURRENT DISPLAYED COLOR

  if (!gridSize) {
    newGridSize = 16;

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

// ---------------------------------------------------------------------------
//                 ETCH-A-SKETCH FOR FILLING IN THE SQUARES
// ---------------------------------------------------------------------------

// FUNCTION FOR FILLING IN THE SQUARES WITH A MOUSE

function fillEtchASketchSquareMouse() {
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
      applySelectedColor(e.target, opacity);

      if (opacity < 1) {
        opacity += 0.1;
      }
    });
  });
}

// FUNCTION WITH EVENT LISTENER FOR FILLING IN THE SQUARES WITH TOUCH STATE, TOUCH MOVE AND TOUCH END

function fillEtchASketchSquareTouch() {
  etchASketchSquare.forEach((square) => {
    square.addEventListener('touchstart', touchStart);
    square.addEventListener('touchmove', touchMove);
    square.addEventListener('touchend', touchEnd);
  });
}

// VARIABLES FOR CONTROLLING HOW EACH SQUARE REACTS ALONG WITH A MAP FOR STORING EACH SQUARES OPACITY

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

  applySelectedColor(e.target, touchOpacity);

  if (opacityMap.get(previousSquare) < 1 && opacityToggle === 'opacity on') {
    opacityMap.set(previousSquare, opacityMap.get(previousSquare) + 0.1);
  }
}

// A LOT OF THE "touchMove(e)" FUNCTION COMES FROM CHATGPT (WITH MY MODIFICATIONS) AND MDN

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
      applySelectedColor(currentSquare, touchOpacity);

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

// ---------------------------------------------------------------------------
//                     GET RANDOM COLOR FOR RAINBOW
// ---------------------------------------------------------------------------

function getRandomColorWithOpacity(opacity) {
  let randomNumberOne = Math.floor(Math.random() * 256);
  let randomNumberTwo = Math.floor(Math.random() * 256);
  let randomNumberThree = Math.floor(Math.random() * 256);

  const rainbow = `rgb(${randomNumberOne}, ${randomNumberTwo}, ${randomNumberThree}, ${opacity})`;

  return rainbow;
}

// ---------------------------------------------------------------------------
//                         GET USER SELECTED COLOR
// ---------------------------------------------------------------------------

function getSelectedColor() {
  const selectedColor = document.querySelector('.colors-container');

  const colors = Array.from(selectedColor.children);

  // THIS ANSWER WAS GIVEN BY CHATGPT USING OBJECT DESTRUCTURING WHICH I DON'T FULLY UNDERSTAND AT THIS POINT (AUGUST 6TH, ,2023)

  // const colorMap = {
  //   red: { r: 255, g: 0, b: 0 },
  //   orange: { r: 255, g: 165, b: 0 },
  //   yellow: { r: 255, g: 255, b: 0 },
  //   green: { r: 0, g: 128, b: 0 },
  //   blue: { r: 0, g: 0, b: 255 },
  //   purple: { r: 128, g: 0, b: 128 },
  //   black: { r: 0, g: 0, b: 0 },
  //   white: { r: 255, g: 255, b: 255 },
  // };

  // selectedColor.forEach((color) => {
  //   color.addEventListener('click', () => {
  //     const colorClass = color.classList[0];

  //     if (colorClass === 'rainbow') {
  //       rainbowBackgroundDisplay();
  //     } else {
  //       userSelectedColor = colorClass;

  //       const { r, g, b } = colorMap[colorClass];

  //       customOpacityDisplay.style.background = `rgba(${r}, ${g}, ${b}, ${opacitySlider.value})`;

  //       console.log(colorClass, r, g, b);
  //     }
  //   });
  // });

  // THIS IS THE EXACT SAME ANSWER WITHOUT USING OBJECT DESTRUCTURING, SOMETHING I HAVE SOME KNOWLEDGE ON AT THIS TIME (AUGUST 6TH, 2023)

  // THIS "colorMap" VARIABLE USING OBJECTS LIKE THIS IS NEW TO ME, BUT I WANT TO UNDERSTAND IT SO I LEAVE IT HERE FOR FUTURE REFERENCE

  const colorMap = {
    red: { r: 255, g: 0, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    purple: { r: 128, g: 0, b: 128 },
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
  };

  colors.forEach((color) => {
    color.addEventListener('click', () => {
      // I COMMENT THIS CODE OUT BECAUSE I WOULDN'T HAVE DONE THIS: CHATGPT DID IT AND I WILL LEARN FROM EXAMPLE

      // const colorClass = color.classList[0];

      if (color.classList[0] === 'rainbow') {
        rainbowBackgroundDisplay();
      } else {
        userSelectedColor = color.classList[0];

        const colorValues = colorMap[color.classList[0]];

        customOpacityDisplay.style.background = `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${opacitySlider.value})`;
      }

      // SETS CUSTOM GRID COLOR TO NULL AGAIN (IF IT ISN'T ALREADY NULL) SO "applySelectedColor()" RUNS CORRECTLY

      if (userCustomGridColor !== null) {
        userCustomGridColor = null;
      }

      opacityMap.clear();
    });
  });
}

// ---------------------------------------------------------------------------
//                    GET USER SELECTED COLOR AND OPACITY
// ---------------------------------------------------------------------------

// REFACTORED THIS CODE USING THE SAME EXAMPLE FROM "GET USER SELECTED COLOR"

function getSelectedColorAndOpacity(squareOpacity) {
  const colorMapWithOpacity = {
    red: { r: 255, g: 0, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    purple: { r: 128, g: 0, b: 128 },
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
  };

  let colorOpacityValues = colorMapWithOpacity[userSelectedColor];

  if (userSelectedColor === 'rainbow') {
    rainbowBackgroundDisplay(squareOpacity);

    return 'rainbow';
  }

  return `rgba(${colorOpacityValues.r}, ${colorOpacityValues.g}, ${colorOpacityValues.b}, ${squareOpacity})`;

  // if (userSelectedColor === 'red') {
  //   return `rgba(${255}, ${0}, ${0}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'orange') {
  //   return `rgba(${255}, ${165}, ${0}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'yellow') {
  //   return `rgba(${255}, ${255}, ${0}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'green') {
  //   return `rgba(${0}, ${128}, ${0}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'blue') {
  //   return `rgba(${0}, ${0}, ${255}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'purple') {
  //   return `rgba(${128}, ${0}, ${128}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'black') {
  //   return `rgba(${0}, ${0}, ${0}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'white') {
  //   return `rgba(${255}, ${255}, ${255}, ${squareOpacity})`;
  // }
  // if (userSelectedColor === 'rainbow') {
  //   // THIS FUNCTIO EXIST TO UPDATE THE OPACITY FOR RAINBOW IF SELECTED. UNSURE IF IT'S THE CORRECT WAY TO DO IT THIS WAY OR NOT

  //   rainbowBackgroundDisplay();

  //   return 'rainbow';
  // }
}

// ---------------------------------------------------------------------------
//                          GET USER CUSTOM COLOR
// ---------------------------------------------------------------------------

// THE VARIABLE "userCustomGridColor" CONTROLS HOW THE FUNCTION "getCustomOpacity()" RUNS

let userCustomGridColor = null;

// THIS EVENT LISTENER CONSTANTLY DISPLAYS WHAT'S IN THE DISPLAY AS THE USER PICKS A COLOR FROM THE "INPUT TYPE COLOR" FIELD

customGridColor.addEventListener('input', () => {
  userCustomGridColor = customGridColor.value;

  customOpacityDisplay.style.background = getCustomGridColor(
    opacitySlider.value
  );
});

customGridColor.addEventListener('change', () => {
  userSelectedColor = 'custom grid color';

  opacityMap.clear();
  fillEtchASketchSquareMouse();
  fillEtchASketchSquareTouch();
});

// THIS FUNCTION ALLOWS USE TO TRANSLATE THE INPUT OF HEX TO RGBA AND RETURN THAT RESULT

function getCustomGridColor(newSquareOpacity) {
  const r = parseInt(userCustomGridColor.slice(1, 3), 16);
  const g = parseInt(userCustomGridColor.slice(3, 5), 16);
  const b = parseInt(userCustomGridColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${newSquareOpacity})`;
}

// ---------------------------------------------------------------------------
//         COMBINE ALL ABOVE RESULTS TO CHANGE THE GRID SQUARES COLORS
// ---------------------------------------------------------------------------

function applySelectedColor(targetSquare, currentOpacity) {
  let newTargetSquare = targetSquare;

  if (userSelectedColor === 'rainbow') {
    newTargetSquare.style.background =
      getRandomColorWithOpacity(currentOpacity);
  } else if (userSelectedColor === 'custom grid color') {
    newTargetSquare.style.background = getCustomGridColor(currentOpacity);
  } else {
    newTargetSquare.style.background =
      getSelectedColorAndOpacity(currentOpacity);
  }
}

// THIS FUNCTION IS USED TO NOT ONLY UPDATE THE OPACITY SLIDER VALUE IN THE SELECTED COLOR DISPLAY, BUT ALSO FOR THE COLOR IN EACH GRID SQUARE

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

function clearGrid() {
  etchASketchSquare.forEach((square) => {
    const blankSquare = square;

    blankSquare.removeAttribute('style');

    opacityMap.clear();
  });
}

function toggleOpacity() {
  opacityToggleBtn.addEventListener('click', () => {
    if (opacityToggleBtn.textContent === 'Opacity off') {
      opacityToggleBtn.textContent = 'Opacity on';
      opacityToggle = 'opacity on';
    } else {
      opacityToggleBtn.textContent = 'Opacity off';
      opacityToggle = 'opacity off';
    }

    opacityMap.clear();
    fillEtchASketchSquareMouse();
    fillEtchASketchSquareTouch();
  });
}

toggleOpacity();

function toggleGridBordersDisplay() {
  toggleGridBordersBtn.addEventListener('click', () => {
    if (gridBordersToggle === 'grids on') {
      etchASketchSquare.forEach((square) => {
        square.classList.add('etch-a-sketch-square-no-border');
      });

      gridBordersToggle = 'grids off';
    } else if (gridBordersToggle === 'grids off') {
      etchASketchSquare.forEach((square) => {
        square.classList.remove('etch-a-sketch-square-no-border');
      });

      gridBordersToggle = 'grids on';
    }
  });
}

toggleGridBordersDisplay();

// THIS FUNCTION EXIST TO ALLOW "getCustomOpacity()" TO UPDATE THE OPACITY DISPLAY IF "RAINBOW" IS SELECTED

function rainbowBackgroundDisplay() {
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

// ---------------------------------------------------------------------------
//               OLD EVENT LISTENER USING IF ELSE CHAINING
// ---------------------------------------------------------------------------

// LEAVING THIS HERE TO REMIND MYSELF TO DO BETTER AND CONTINUE TO LEARN TO IMPROVE MY CODE

// selectedColor.forEach((color) => {
//   color.addEventListener('click', () => {
//     if (color.classList[0] === 'red') {
//       userSelectedColor = 'red';

//       customOpacityDisplay.style.background = `rgba(${255}, ${0}, ${0}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'orange') {
//       userSelectedColor = 'orange';

//       customOpacityDisplay.style.background = `rgba(${255}, ${165}, ${0}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'yellow') {
//       userSelectedColor = 'yellow';

//       customOpacityDisplay.style.background = `rgba(${255}, ${255}, ${0}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'green') {
//       userSelectedColor = 'green';

//       customOpacityDisplay.style.background = `rgba(${0}, ${128}, ${0}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'blue') {
//       userSelectedColor = 'blue';

//       customOpacityDisplay.style.background = `rgba(${0}, ${0}, ${255}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'purple') {
//       userSelectedColor = 'purple';

//       customOpacityDisplay.style.background = `rgba(${128}, ${0}, ${128}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'black') {
//       userSelectedColor = 'black';

//       customOpacityDisplay.style.background = `rgba(${0}, ${0}, ${0}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'white') {
//       userSelectedColor = 'white';

//       customOpacityDisplay.style.background = `rgba(${255}, ${255}, ${255}, ${
//         opacitySlider.value
//       })`;
//     } else if (color.classList[0] === 'rainbow') {
//       rainbowBackgroundDisplay();
//     }

//     SETS CUSTOM GRID COLOR TO NULL AGAIN (IF IT ISN'T ALREADY NULL) SO "applySelectedColor()" RUNS CORRECTLY

//     if (userCustomGridColor !== null) {
//       userCustomGridColor = null;
//     }

//     opacityMap.clear();
//   });
// });
