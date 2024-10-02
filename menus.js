const readline = require("readline");
const { TimerConfig } = require("./Utils/timerConfig");
const { startPomodoro} = require("./timer");

const Utils = require("./Utils/utils");

// Setup the input reader
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
 *
 *
 *
 *
 *    Display Main Menu Below
 *
 *
 *
 */
function MainMenu() {
  console.clear();
  console.log("********************************");
  console.log("*   Timer App by Surafel ⏰   *");
  console.log("********************************");
  console.log("* 1. Start Timer ⏳           *");
  console.log("* 2. Settings ⚙️               *");
  console.log("* 3. Stats and History 📊     *");
  console.log("* 4. Exit ❌                  *");
  console.log("*******************************");

  // Capture the user's input
  rl.question("\nChoose an option: ", (choice) => {
    handleMenuInput(choice);
  });
}

// Handle user's choice from the Main Menu
function handleMenuInput(choice) {
  switch (choice) {
    case "1":
      //
      console.log("Starting Timer...");
      startPomodoro(MainMenu);
      break;
    case "2":
      //
      SettingsMenu();
      break;
    case "3":
      //
      StatsMenu();
      break;
    case "4":
      console.log("Exiting...");
      rl.close(); // Close the readline interface and exit
      process.exit();
      break;
    default:
      console.log("Invalid option. Please try again.");
      MainMenu(); // Go Return to main menu if invalid input
  }
}
/*
 *
 *
 *
 *
 *     Setting Menu Below
 *
 *
 *
 */

function SettingsMenu() {
  console.clear();
  console.log("********************************");
  console.log("*      Timer Settings  ⏰      *");
  console.log("********************************");
  console.log(`* 1. Set Focus Interval (${TimerConfig.focusInterval} Min) `);
  console.log(`* 2. Set Short Break (${TimerConfig.shortBreakInterval} Min) `);
  console.log(`* 3. Set Long Break (${TimerConfig.longBreakInterval} Min) `);
  console.log("* 4. Return  🔙               ");
  console.log("********************************");

  // Capture the user's input
  rl.question("\nChoose an option: ", (choice) => {
    handleSettingsMenuInput(choice);
  });
}

// Handle user's choice from the Settings Menu
function handleSettingsMenuInput(choice) {
  switch (choice) {
    case "1":
      SetFocusIntervalMenu();
      break;
    case "2":
      SetShortIntervalMenu();
      break;
    case "3":
      SetLongIntervalMenu();
      break;
    case "4":
      MainMenu(); //returning to Main Menu
      break;
    default:
      console.log("Invalid option. Please try again.");
      SettingsMenu(); // Go Return to Settings menu if invalid input
  }
}


/*
 *
 *
 *
 *
 *    Set Focus Interval Menu
 *
 *
 *
 */

function SetFocusIntervalMenu() {
  console.clear();
  console.log("********************************");
  console.log("*   Set Focus Interval  ⏰     *");
  console.log("********************************");

  // Capture the user's input
  rl.question("\nSet New Value in Minutes: ", async (val) => {
    try {
      TimerConfig.updateFocusInterval(val);
      console.log("Focus Interval Succesfully Set!");
    } catch (err) {
      console.log(`Error - ${err.message}`);
    }
    await Utils.delayConsole(1);
    SettingsMenu();
  });
}


/*
 *
 *
 *
 *
 *    Set Short Interval Menu
 *
 *
 *
 */

function SetShortIntervalMenu() {
  console.clear();
  console.log("*************************************");
  console.log("*   Set Short Break Interval  ⏰    *");
  console.log("*************************************");

  // Capture the user's input
  rl.question("\nSet New Value in Minutes: ", async (val) => {
    try {
      TimerConfig.updateShortInterval(val);
      console.log("Short Break Interval Succesfully Set!");
    } catch (err) {
      console.log(`Error - ${err.message}`);
    }
    await Utils.delayConsole(1);
    SettingsMenu();
  });
}


/*
 *
 *
 *
 *
 *    Set Long Interval Menu
 *
 *
 *
 */

function SetLongIntervalMenu() {
  console.clear();
  console.log("************************************");
  console.log("*   Set Long Break Interval  ⏰    *");
  console.log("************************************");

  // Capture the user's input
  rl.question("\nSet New Value in Minutes: ", async (val) => {
    try {
      TimerConfig.updateLongInterval(val);
      console.log("Long Break Interval Succesfully Set!");
    } catch (err) {
      console.log(`Error - ${err.message}`);
    }
    await Utils.delayConsole(1);
    SettingsMenu();
  });
}


/*
 *
 *
 *
 *
 *    Stats Display Menu
 *
 *
 *
 */

function StatsMenu() {
  console.clear();
  console.log(`You Have spend: ${TimerConfig.totalFocusTime} Min in Total Focus.`);
  console.log(`You Have spend: ${TimerConfig.totalBreakTime} Min in Total on Breaks.`);
  console.log("1. Return");

  console.log("*************************************************************************");
  console.log("*             Stats and History 📊                                     *");
  console.log("************************************************************************");
  console.log("* 1. Return 🔙");
  console.log(`* You Have spend: ${TimerConfig.totalFocusTime} Min in Total Focus.`);
  console.log(`* You Have spend: ${TimerConfig.totalBreakTime} Min in Total on Breaks.`);
  console.log("*************************************************************************");

  // Capture the user's input
  rl.question("\nChoose an option: ", (choice) => {
    handleStatsMenuInput(choice);
  });
}

// Handle user's choice from the Stats Menu
function handleStatsMenuInput(choice) {
  switch (choice) {
    case "1":
      MainMenu(); //returning to Main Menu
      break;
    default:
      console.log("Invalid option. Please try again.");
      StatsMenu(); // Go Return to Settings menu if invalid input
  }
}

module.exports = {
  MainMenu,
};
