# Pomodoro Timer By Surafel ⏰

This is a simple **Pomodoro Timer** built using **Node.js**. It follows the Pomodoro Technique, a time management method that breaks work into intervals (usually 25 minutes of focus) followed by short breaks. Every fourth break is longer, allowing for more rest after focused work.

---

## 📁 Project Structure

├── assets/                     # Audio files used for notifications \n
│   ├── notification.mp3        # Sound when a task is complete \n
│   ├── pause.mp3               # Sound when the timer is paused \n
│   ├── unpause.mp3             # Sound when the timer is resumed \n
├── configs/ \n
│   └── myTimerConfig.json       # Stores user settings like break intervals, focus time, etc. \n
├── node_modules/                # Auto-generated after npm install (do not modify) \n
├── src/                         # Source code \n
│   ├── Utils/ \n
│   │   ├── timerConfig.js       # Handles loading/saving user timer configuration \n
│   │   ├── utils.js             # Helper functions like delays, sounds, etc. \n
│   ├── menus.js                 # Handles navigation through the different menus \n
│   ├── timerCore.js             # Core Pomodoro functionality (timer, notifications) \n
├── .gitignore                   # Ignores node_modules and other files in Git \n
├── index.js                     # Main entry point of the application \n
├── package-lock.json            # Auto-generated after npm install (do not modify) \n
├── package.json                 # Contains npm dependencies and scripts \n
└── README.md                    # Instructions and project overview (this file) \n


## 🛠️ Installation
  
  ## Step 1: Clone the Repository using this command
    git clone https://github.com/surafel-47/pomodoro_timer_node.git

  ## Step 2: Navigate to the Project Directory in terminal

  ## Step 3: Get the NPM package Dependencies By running this command on terminal
    npm install


## 🎯 Usage
    
   ## Step 1: Start the Application
    node index

   ## Step 2: Naviagate Via the console Menu using the Buttons
        ********************************
        *   Timer App by Surafel ⏰   *
        ********************************
        * 1. Start Timer ⏳            *
        * 2. Settings ⚙️              *
        * 3. Stats and History 📊     *
        * 4. Exit ❌                  *
        *******************************
