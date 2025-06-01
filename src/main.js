// Pomodoro Timer Logic

let timerInterval;
let isRunning = false;
let isWorkTime = true;
let workDuration = 25 * 60; // seconds
let breakDuration = 5 * 60; // seconds
let timeLeft = workDuration;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workInput = document.getElementById('workDuration');
const breakInput = document.getElementById('breakDuration');
const themeToggle = document.getElementById('themeToggle');
const progressCircle = document.getElementById('progressCircle');

const CIRCLE_LENGTH = 2 * Math.PI * 90; // 2πr, r=90

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  statusDisplay.textContent = isWorkTime ? 'Work Time' : 'Break Time';
  updateProgressBar();
}

function updateProgressBar() {
  const total = isWorkTime ? workDuration : breakDuration;
  const progress = 1 - timeLeft / total;
  progressCircle.style.strokeDashoffset = (CIRCLE_LENGTH * progress).toString();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      switchMode();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startBtn.classList.remove('hidden');
  pauseBtn.classList.add('hidden');
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  timeLeft = isWorkTime ? workDuration : breakDuration;
  updateDisplay();
}

function switchMode() {
  isWorkTime = !isWorkTime;
  timeLeft = isWorkTime ? workDuration : breakDuration;
  updateDisplay();
  // Optionally play a sound here
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workInput.addEventListener('change', (e) => {
  workDuration = parseInt(e.target.value, 10) * 60;
  if (isWorkTime) {
    timeLeft = workDuration;
    updateDisplay();
  }
});
breakInput.addEventListener('change', (e) => {
  breakDuration = parseInt(e.target.value, 10) * 60;
  if (!isWorkTime) {
    timeLeft = breakDuration;
    updateDisplay();
  }
});

// Initial display
updateDisplay(); 