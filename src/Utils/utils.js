const sound = require("sound-play");
const path = require("path");
const notifier = require("node-notifier");

class Utils {
  static pause = "./assets/pause.mp3";
  static unpause = "./assets/unpause.mp3";
  static notification = "./assets/notification.mp3";

  static delayConsole(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000)); // in mil seconds
  }

  static playSound(filePath) {
    const absolutePath = path.resolve(filePath);

    sound.play(absolutePath).catch((err) => {});
  }

    // Show desktop notification
    static showNotification(title, message) {
    notifier.notify(
      {
        title: title,
        message: message,
        sound: false,
        timeout: 3, //To Closce after
      },
      (err, response) => {
        if (err) {
          console.error(`eRror: ${err}`);
        }
      }
    );

    // Play notification sound
    this.playSound(this.notification);
  }
}

module.exports = Utils;
