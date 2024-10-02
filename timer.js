const { TimerConfig } = require("./Utils/timerConfig");
const readline = require("readline");
const Utils = require("./Utils/utils");

let currentInterval = "focus"; // to track current interval 'focus', 'shortBreak', 'longBreak'
let cycleCount = 0; // Track how many focus intervals completed
let universTime = 20; //1000 means 1 second in real life

// Listen to keypresses asynchronously
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function startTimer(duration, intervalType, callback) {
  let remainingTime = duration * 60; // Convert minutes to seconds
  let paused = false; // check if paused or nat
  let timer; // The interval variable

  console.clear();
  console.log(
    "***************************************************************"
  );
  console.log(
    `*          ${intervalType} Timer                                  *`
  );
  console.log(
    "*                                                             *"
  );
  console.log(
    "*      Space: pause/resume     C: Cancel                      *"
  );
  console.log(
    "***************************************************************"
  );

  // to update the timer display every second
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
function manageCycle() {
  Utils.showNotification(
    `${currentInterval} Done!`,
    "This Interval Has Completed"
  ); //show notifcs

  //if Focus interval completed, so move to short or long break conditionally
  if (currentInterval === "focus") {
    TimerConfig.incrementTotalFocusTime(TimerConfig.focusInterval);
    cycleCount++;
    if (cycleCount % 4 === 0) {
      // Every 4th focus interval, take a long break
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
