My Workout App
My Workout App is a modern workout tracker application developed with React and TypeScript. The app uses Material UI for styling, Capacitor for local persistence (even without an internet connection), and i18next for multilingual support (English and German). It allows you to manage exercises and workouts, perform current workouts, check off sets, and save completed workouts with a timestamp to track progress.

Features
Manage Exercises & Workouts:
Create, edit, and delete global exercises and workout templates.
Current Workout:
Start a workout, check off individual sets as completed, and finish the workout.
History:
Track completed workouts including the completion timestamp.
Home View:
Overview with key metrics (e.g., total number of exercises, workouts, last workout).
Dark Mode:
Support for both dark and light mode.
Burger Menu:
Navigation between views via a drawer menu.
Multilingual Support:
Support for English and German using i18next.
Local Persistence:
Data (exercises, workouts, history) is stored on the device using Capacitor.
Getting Started
Prerequisites
Node.js (>= 14.x)
npm (or yarn)
Android Studio (if you are building for Android with Capacitor)
Visual Studio Code (recommended for development)
Installation
Clone the repository:

bash
Kopieren
git clone https://github.com/PaulHellweg/my-workout-app.git
cd my-workout-app
Install the dependencies:

bash
Kopieren
npm install
(Optional) Install Capacitor globally, if not already installed:

bash
Kopieren
npm install -g @capacitor/cli
Running the App (Web)
Start the app in development mode:

bash
Kopieren
npm start
Then open http://localhost:3000 in your browser.

Production Build
Generate the production build:

bash
Kopieren
npm run build
Deployment on Android
Build the React app:

bash
Kopieren
npm run build
Synchronize the Capacitor project:

bash
Kopieren
npx cap sync android
Open the Android project in Android Studio and run it on your device or emulator:

bash
Kopieren
npx cap open android
Code Formatting
We use Prettier for automatic code formatting. Our settings can be found in the .prettierrc file. In Visual Studio Code, you can enable Format On Save by adding the following settings to your settings.json:

Contributing
Contributions are welcome! Please fork the repository, develop your changes, and create a pull request.

License
This project is licensed under the MIT License.
