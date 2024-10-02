const { MainMenu } = require("./menus");
const { TimerConfig } = require("./Utils/timerConfig");
const Utils = require("./Utils/utils");

async function main() {
  await TimerConfig.loadConfig(); //load values from file
  await Utils.delayConsole(1);
  MainMenu();
}

main();
