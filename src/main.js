// Pomodoro Timer Logic

let timerInterval;
let isRunning = false;
let isWorkTime = true;
let workDuration = 10; // 10 seconds for debugging
let breakDuration = 5; // 5 seconds for debugging
let timeLeft = workDuration;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressCircle = document.getElementById('progressCircle');
const progressKnob = document.getElementById('progressKnob');

const CIRCLE_LENGTH = 2 * Math.PI * 90; // 2πr, r=90

// Debug: Check if elements exist
console.log('DOM Elements found:', {
  timerDisplay: !!timerDisplay,
  startBtn: !!startBtn,
  pauseBtn: !!pauseBtn,
  progressCircle: !!progressCircle,
  progressKnob: !!progressKnob
});

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  updateProgressBar();
}

function updateProgressBar() {
  const total = isWorkTime ? workDuration : breakDuration;
  const progress = (total - timeLeft) / total; // Progress from 0 to 1
  
  console.log(`Progress Update: ${progress.toFixed(3)}, TimeLeft: ${timeLeft}, Total: ${total}`);
  
  // Update progress circle - fill up as time progresses
  const offset = CIRCLE_LENGTH * (1 - progress);
  console.log(`Setting stroke-dashoffset to: ${offset.toFixed(2)}`);
  
  if (progressCircle) {
    progressCircle.style.strokeDashoffset = offset.toString();
    // Also try setting the attribute directly
    progressCircle.setAttribute('stroke-dashoffset', offset.toString());
  } else {
    console.error('progressCircle element not found!');
  }

  // Move the knob along the circle
  if (progressKnob) {
    const angle = 2 * Math.PI * progress - Math.PI / 2; // Start from top
    const r = 90;
    const cx = 100 + r * Math.cos(angle);
    const cy = 100 + r * Math.sin(angle);
    progressKnob.setAttribute('cx', cx);
    progressKnob.setAttribute('cy', cy);
    console.log(`Knob position: cx=${cx.toFixed(1)}, cy=${cy.toFixed(1)}`);
  } else {
    console.error('progressKnob element not found!');
  }
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
  
  // Optional: Play notification sound or show alert
  if (isWorkTime) {
    console.log('Break time over! Time to work!');
  } else {
    console.log('Work session complete! Time for a break!');
  }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);

// Add double-click to reset (since we don't have a reset button in the UI)
timerDisplay.addEventListener('dblclick', resetTimer);

// Initialize display
updateDisplay(); 