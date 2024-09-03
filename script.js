// script.js

let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let lapCounter = 1;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lap-list");

function updateDisplay() {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(elapsedTime % 1000);

  display.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      elapsedTime += 10; // Increment by 10 milliseconds
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  lapList.innerHTML = ""; // Clear lap list
  lapCounter = 1;
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
  }
}

startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
