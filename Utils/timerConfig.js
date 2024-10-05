const fs = require("fs");
const path = require("path");

class TimerConfig {
  static configFilePath = path.join(__dirname,"../","configs", "myTimerConfig.json");
  static longBreakInterval = 5; // Default values
  static shortBreakInterval = 3; // Default values
  static focusInterval = 7; // Default values
  static totalBreakTime = 0; // To be loaded from config
  static totalFocusTime = 0; // To be loaded from config

  // Method to load config from file or create default if not exists
  static loadConfig() {
    // Check if config file exists
    if (!fs.existsSync(this.configFilePath)) {
      console.log("Config file not found, creating new config...");
      this.saveConfig(); // Create the file with default values
    } else {
      // Load and parse the config file
      const configData = fs.readFileSync(this.configFilePath, "utf8");
      const config = JSON.parse(configData);

      // Set the values from the config
      this.longBreakInterval = Number(config.longBreakInterval) || this.longBreakInterval;
      this.shortBreakInterval = Number(config.shortBreakInterval) || this.shortBreakInterval;
      this.focusInterval = Number(config.focusInterval) || this.focusInterval;
      this.totalBreakTime = Number(config.totalBreakTime) || this.totalBreakTime;
      this.totalFocusTime = Number(config.totalFocusTime) || this.totalFocusTime;

      console.log("Configs loaded successfully.");
    }
  }

  // Method to save config to file
  static saveConfig() {
    const config = {
      longBreakInterval: this.longBreakInterval,
      shortBreakInterval: this.shortBreakInterval,
      focusInterval: this.focusInterval,
      totalBreakTime: this.totalBreakTime,
      totalFocusTime: this.totalFocusTime,
    };

    // Write config to file
    fs.writeFileSync(
      this.configFilePath,
      JSON.stringify(config, null, 2),
      "utf8"
    );
  }

  // Helper to validate input
  static validateInterval(val) {
    const parsedValue = Number(val); // Parse the input to a number

    // Check if the parsing was successful and validate the value
    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 60) {
      throw new Error("Invalid value: must be a number between 1 and 60.");
    }
  }

  //update the long break interval 
  static updateLongInterval(val) {
    this.validateInterval(val); 
    this.longBreakInterval = val;
    this.saveConfig(); 
  }

  //update the short break interval 
  static updateShortInterval(val) {
    this.validateInterval(val); // Validate input
    this.shortBreakInterval = val;
    this.saveConfig(); 
  }

  //update the focus interval 
  static updateFocusInterval(val) {
    this.validateInterval(val); // Validate input
    this.focusInterval = val;
    this.saveConfig(); 
  }

  // increment total break time 
  static incrementTotalBreakTime(val) {
    this.totalBreakTime += val;
    this.saveConfig(); 
  }

  //to increment total focus time
  static incrementTotalFocusTime(val) {
    this.totalFocusTime += val;
    this.saveConfig(); 
  }
}

module.exports = { TimerConfig };
