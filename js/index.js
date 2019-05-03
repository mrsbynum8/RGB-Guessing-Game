let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let rootStyle = getComputedStyle(document.querySelector("html"));
let mainBgColor = rootStyle.getPropertyValue("--main-bg-color");

init();
function init() {
  setupModeButtons();
 setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
   for (let i = 0; i < squares.length; i++) {
    //add click events
    squares[i].addEventListener("click", function() {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Right! WOO HOO!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = mainBgColor;
        messageDisplay.textContent = "NOPE! Try again...";
      }
    });}
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.background = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "#CC0000";
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", () => {
  reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
  //loop through squares
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  //return "rgb(" + r + ", " + g + ", " + b + ")";
  return `rgb(${r}, ${g}, ${b})`;
}
