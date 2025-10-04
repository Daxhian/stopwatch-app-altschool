// DOM elements
const timeDisplay = document.getElementById("time-display");
const toggleButton = document.getElementById("toggle-button");
const resetBtn = document.getElementById("reset-button");
const lapBtn = document.getElementById("lap-button");
const lapList = document.getElementById("lap-list");

// Stopwatch state variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

// Function to format time to hours:minutes:seconds.milliseconds
function formatTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10); // 2 digits for consistency
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
}

// Function to update time display
function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

// START/STOP the stopwatch
toggleButton.addEventListener("click", () => {
  if (!isRunning) {
    // Start Timer
    startTime = Date.now() - elapsedTime; // Resume from paused time
    timerInterval = setInterval(updateTime, 10); // Fixed: updateDisplay → updateTime
    isRunning = true;
    lapBtn.disabled = false; // Enable lap button
    resetBtn.disabled = false; // Enable reset button
  } else {
    // Stop Timer
    clearInterval(timerInterval);
    isRunning = false;
    lapBtn.disabled = true; // Disable lap button
  }
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapList.innerHTML = ""; // Clear lap list
  lapCount = 0;
  lapBtn.disabled = true;
  resetBtn.disabled = true; // Disable reset when timer is reset
});

// Record a lap time
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem); // Add laps at bottom
  }
});

// Initialize button states
resetBtn.disabled = true;
lapBtn.disabled = true;