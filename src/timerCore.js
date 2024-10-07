const { TimerConfig } = require("./Utils/timerConfig");
const readline = require("readline");
const Utils = require("./Utils/utils");

let currentInterval = "focus"; // to track current interval 'focus', 'shortBreak', 'longBreak'
let cycleCount = 0; // Track how many focus intervals completed
const universTime = 10; //1000 means 1 second in real life
const cycleEndCount = 4; //  Set in how many Intervals the Cycle show Long Break Interval

// Listen to keypresses asynchronously
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

/**
 * Starts a timer for a given duration, providing options to pause, resume, or cancel the timer.
 * The timer will count down and execute a callback when complete. The timer also listens for
 * keyboard input to pause/resume (Space) or cancel (C).
 *
 * @param {number} duration - The duration of the timer in minutes.
 * @param {string} intervalType - The type of timer (e.g., "focus", "shortBreak", or "longBreak").
 * @param {function} callback - A function to be executed when the timer finishes.
 *
 * @example
 * // Start a 25-minute focus timer
 * startTimer(25, 'focus', () => {
 *   console.log('Focus session complete!');
 * });
 *
 * @remarks
 * The function listens for keypress events:
 *  - Space to pause/resume the timer.
 *  - 'C' to cancel the timer and exit.
 *
 * The timer updates every second, and upon completion, updates the session history by calling
 * TimerConfig methods to increment total focus or break time based on the interval type.
 */
function startTimer(duration, intervalType, callback) {
  let remainingTime = duration * 60; // Convert minutes to seconds
  let paused = false; // check if paused or nah
  let timer; // The interval variable

  console.clear();
  console.log("****************************************************");
  console.log(`*          ${intervalType} Timer ⏰`);
  console.log("*");
  console.log("*      Space: pause/resume ⏯️    C: Cancel ❌");
  console.log("****************************************************");

  // to update the timer display every second
  /**
   * Updates and displays the remaining time for the current interval.
   * The function handles decrementing the remaining time every second,
   * and updates the display accordingly. It also checks for pause/resume
   * or cancel actions via keypresses and updates the stats upon completion.
   *
   */
  function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    process.stdout.write(
      `\r${intervalType} Time Left: ${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")} `
    );
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(timer);
      console.log(`\n${intervalType} complete!`);
      process.stdin.removeAllListeners("keypress"); // Stop listening for keypresses

      //Updating the Stats History
      if (intervalType == "focus") {
        TimerConfig.incrementTotalFocusTime(TimerConfig.focusInterval);
      } else if (intervalType == "shortBreak") {
        TimerConfig.incrementTotalBreakTime(TimerConfig.shortBreakInterval);
      } else {
        TimerConfig.incrementTotalBreakTime(TimerConfig.longBreakInterval);
      }
      callback(); // Trigger the next stage of the cycle
    }
  }

  // Start the timer interval
  timer = setInterval(updateTimer, universTime);

  // Listen for keypress events
  process.stdin.on("keypress", (str, key) => {
    if (key.name === "space") {
      if (paused) {
        // Resume the timer
        paused = false;
        timer = setInterval(updateTimer, universTime); // Resume the interval
        Utils.playSound(Utils.unpause);
      } else {
        // Pause the timer
        paused = true;
        Utils.playSound(Utils.pause);
        clearInterval(timer); // Stop the interval
      }
    } else if (key.name === "c") {
      // Cancel the timer
      clearInterval(timer);
      console.log("\nTimer Closed.");
      process.stdin.removeAllListeners("keypress");
      process.exit();
    }
  });
}

// tO manage  work and break cycle
/**
 * Manages the Pomodoro cycle by alternating between focus and break intervals.
 * It increments the cycle count, updates stats, and determines whether to start
 * a short break, long break, or new focus interval based on the cycle count.
 *
 * The function is recursively called after each interval (focus or break)
 * is completed to transition to the next one.
 */
function manageCycle() {
  Utils.showNotification(
    `${currentInterval} Done!`,
    "This Interval Has Completed"
  ); //show notifcs

  //if Focus interval completed, so move to short or long break conditionally
  if (currentInterval === "focus") {
    TimerConfig.incrementTotalFocusTime(TimerConfig.focusInterval);
    cycleCount++;
    if (cycleCount % cycleEndCount === 0) {
      // Every cycleEndCount focus interval, take a long break
      currentInterval = "longBreak";
      startTimer(TimerConfig.longBreakInterval, "Long Break", manageCycle);
    } else {
      // Otherwise, take a short break
      currentInterval = "shortBreak";
      startTimer(TimerConfig.shortBreakInterval, "Short Break", manageCycle);
    }
  } else {
    // Break completed, start a new focus interval
    currentInterval = "focus";
    startTimer(TimerConfig.focusInterval, "Focus", manageCycle);
  }
}

// Start the timer cycle when the user selects "Start Timer"
function startPomodoro() {
  console.clear();
  currentInterval = "focus";
  cycleCount = 0;
  startTimer(TimerConfig.focusInterval, "Focus", manageCycle);
}

module.exports = { startPomodoro, startTimer };
