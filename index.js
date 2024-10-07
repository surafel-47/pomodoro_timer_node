const { MainMenu } = require("./src/menus");
const { TimerConfig } = require("./src/Utils/timerConfig");
const Utils = require("./src/Utils/utils");

async function main() {
  await TimerConfig.loadConfig(); //load values from file
  await Utils.delayConsole(1);
  MainMenu();
}

main();
