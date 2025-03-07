# My Workout App

My Workout App ist eine moderne Workout-Tracker-Anwendung, die mit React und TypeScript entwickelt wurde. Die App nutzt Material UI für das Styling, Capacitor für die lokale Persistenz (auch ohne Internetverbindung) und i18next für die Mehrsprachigkeit (Englisch und Deutsch). Sie ermöglicht es, Übungen und Workouts zu verwalten, aktuelle Workouts durchzuführen, Sätze abzuhaken und abgeschlossene Workouts mit Timestamp zu speichern, um den Fortschritt zu verfolgen.

## Features

- **Übungen & Workouts verwalten:**  
  Erstelle, bearbeite und lösche globale Übungen und Workout-Vorlagen.
- **Aktuelles Workout:**  
  Starte ein Workout, hake einzelne Sätze als erledigt ab und beende das Workout.
- **History:**  
  Verfolge abgeschlossene Workouts inkl. Abschlusszeitpunkt.
- **Home View:**  
  Übersicht mit Kennzahlen (z. B. Gesamtanzahl Übungen, Workouts, letztes Workout).
- **Dark Mode:**  
  Unterstützung für Dark und Light Mode.
- **Burger Menü:**  
  Navigation zwischen den Ansichten über ein Drawer-Menü.
- **Mehrsprachigkeit:**  
  Unterstützung von Englisch und Deutsch mit i18next.
- **Lokale Persistenz:**  
  Speicherung der Daten (Übungen, Workouts, History) auf dem Gerät über Capacitor.

## Projektstruktur

my-workout-app/ ├── android/ # Android-spezifische Dateien (Capacitor) ├── public/ # Öffentliche Assets, z.B. index.html ├── src/ │ ├── components/ # UI-Komponenten │ │ ├── AddExerciseToWorkoutForm.tsx │ │ ├── CurrentWorkoutView.tsx │ │ ├── ExerciseList.tsx │ │ ├── HistoryView.tsx │ │ ├── HomeView.tsx │ │ └── WorkoutList.tsx │ ├── hooks/ # Custom Hooks (Business-Logik) │ │ ├── useExerciseManager.ts │ │ ├── useWorkoutManager.ts │ │ └── useCurrentWorkout.ts │ ├── locales/ # Übersetzungsdateien (i18next) │ │ ├── de/translation.json │ │ └── en/translation.json │ ├── types.ts # TypeScript-Typdefinitionen │ ├── dataManager.ts # Logik zur lokalen Persistenz (Capacitor) │ ├── i18n.ts # i18next-Konfiguration │ └── App.tsx # Hauptkomponente ├── .gitignore ├── package.json ├── tsconfig.json └── README.md # Dieses Dokument

markdown
Kopieren

## Getting Started

### Voraussetzungen

- Node.js (>= 14.x)
- npm (oder yarn)
- Android Studio (wenn du für Android mit Capacitor baust)
- Visual Studio Code (empfohlen für die Entwicklung)

### Installation

1. Klone das Repository:

   ```bash
   git clone https://github.com/your-username/my-workout-app.git
   cd my-workout-app
   Installiere die Abhängigkeiten:
   ```

bash
Kopieren
npm install
(Optional) Installiere Capacitor global, falls noch nicht geschehen:

bash
Kopieren
npm install -g @capacitor/cli
Running the App (Web)
Starte die App im Entwicklungsmodus:

bash
Kopieren
npm start
Öffne dann http://localhost:3000 in deinem Browser.

Production Build
Erzeuge das Produktions-Build:

bash
Kopieren
npm run build
Deployment auf Android
Baue die React-App:

bash
Kopieren
npm run build
Synchronisiere das Capacitor-Projekt:

bash
Kopieren
npx cap sync android
Öffne das Android-Projekt in Android Studio und führe es auf deinem Gerät oder Emulator aus:

bash
Kopieren
npx cap open android
Code Formatierung
Wir verwenden Prettier zur automatischen Code-Formatierung. Unsere Einstellungen findest du in der Datei .prettierrc. In Visual Studio Code kannst du Format On Save aktivieren, indem du folgende Einstellungen in deinen settings.json hinzufügst:

json
Kopieren
{
"editor.formatOnSave": true,
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}
Translations
Die Übersetzungen erfolgen mit i18next. Die Übersetzungsdateien findest du in:

src/locales/en/translation.json
src/locales/de/translation.json
Beispiel-Inhalt für Englisch:

json
Kopieren
{
"welcome": "Welcome to My Workout App",
"menu": "Menu",
"home": "Home",
"exercises": "Exercises",
"workouts": "Workouts",
"current_workout": "Current Workout",
"history": "History",
"create_exercise": "Create Exercise",
"exercise_name": "Exercise Name",
"add_exercise": "Add Exercise",
"workout_name_placeholder": "Workout Name",
"add_workout": "Add Workout",
"start_workout": "Start Workout",
"finish_workout": "Finish Workout",
"total_exercises": "Total Exercises",
"total_workouts": "Total Workouts",
"last_workout": "Last Workout",
"unknown_exercise": "Unknown Exercise",
"set": "Set",
"repetitions_at": "repetitions at",
"dark_mode": "Dark Mode",
"light_mode": "Light Mode",
"add_exercise_to_workout": "Add Exercise to Workout",
"add_exercise_to_workout_button": "Add Exercise",
"workout_not_complete": "Please complete all sets before finishing the workout."
}
(Der deutsche Inhalt befindet sich in src/locales/de/translation.json.)

Contributing
Beiträge sind willkommen! Bitte fork das Repository, entwickle deine Änderungen und erstelle einen Pull Request.

License
Dieses Projekt ist unter der MIT License lizenziert.

Kontakt
Bei Fragen oder Anregungen kannst du mich unter your-email@example.com erreichen.

perl
Kopieren

---

### Download der Datei

Du kannst den obigen Inhalt auch als Datei herunterladen. Klicke dazu auf den folgenden Link, um die Datei herunterzuladen:

[README.md herunterladen](<data:text/markdown;charset=utf-8,%23%20My%20Workout%20App%0A%0AMy%20Workout%20App%20ist%20eine%20moderne%20Workout-Tracker-Anwendung%2C%20die%20mit%20React%20und%20TypeScript%20entwickelt%20wurde.%20Die%20App%20nutzt%20Material%20UI%20f%C3%BCr%20das%20Styling%2C%20Capacitor%20f%C3%BCr%20die%20lokale%20Persistenz%20(auch%20ohne%20Internetverbindung)%20und%20i18next%20f%C3%BCr%20die%20Mehrsprachigkeit%20(Englisch%20und%20Deutsch).%20Sie%20erm%C3%B6glicht%20es%2C%20%C3%9Cbungen%20und%20Workouts%20zu%20verwalten%2C%20aktuelle%20Workouts%20durchzuf%C3%BChren%2C%20S%C3%A4tze%20abzuhaken%20und%20abgeschlossene%20Workouts%20mit%20Timestamp%20zu%20speichern%2C%20um%20den%20Fortschritt%20zu%20verfolgen.%0A%0A%23%23%20Features%0A%0A-%20**%C3%9Cbungen%20%26%20Workouts%20verwalten%3A**%20%0A%20%20Erstelle%2C%20bearbeite%20und%20l%C3%B6sche%20globale%20%C3%9Cbungen%20und%20Workout-Vorlagen.%0A-%20**Aktuelles%20Workout%3A**%20%0A%20%20Starte%20ein%20Workout%2C%20hake%20einzelne%20S%C3%A4tze%20als%20erledigt%20ab%20und%20beende%20das%20Workout.%0A-%20**History%3A**%20%0A%20%20Verfolge%20abgeschlossene%20Workouts%20inkl.%20Abschlusszeitpunkt.%0A-%20**Home%20View%3A**%20%0A%20%20%C3%9Cbersicht%20mit%20Kennzahlen%20(z.%E2%80%AFB.%20Gesamtanzahl%20%C3%9Cbungen%2C%20Workouts%2C%20letztes%20Workout).%0A-%20**Dark%20Mode%3A**%20%0A%20%20Unterst%C3%BCtzung%20f%C3%BCr%20Dark%20und%20Light%20Mode.%0A-%20**Burger%20Men%C3%BC%3A**%20%0A%20%20Navigation%20zwischen%20den%20Ansichten%20%C3%BCber%20ein%20Drawer-Men%C3%BC.%0A-%20**Mehrsprachigkeit%3A**%20%0A%20%20Unterst%C3%BCtzung%20von%20Englisch%20und%20Deutsch%20mit%20i18next.%0A-%20**Lokale%20Persistenz%3A**%20%0A%20%20Speicherung%20der%20Daten%20(%C3%9Cbungen%2C%20Workouts%2C%20History)%20auf%20dem%20Ger%C3%A4t%20%C3%BCber%20Capacitor.%0A%0A%23%23%20Projektstruktur%0A%0A%60%60%60%0Amy-workout-app%2F%0A%E2%94%9C--%20android%2F%20%20%20%20%20%20%20%20%23%20Android-spezifische%20Dateien%20(Capacitor)%0A%E2%94%9C--%20public%2F%20%20%20%20%20%20%20%20%23%20%C3%96ffentliche%20Assets%2C%20z.B.%20index.html%0A%E2%94%9C--%20src%2F%0A%20%20%E2%94%9C--%20components%2F%20%20%20%20%20%20%20%20%23%20UI-Komponenten%0A%20%20%20%20%E2%94%9C--%20AddExerciseToWorkoutForm.tsx%0A%20%20%20%20%E2%94%9C--%20CurrentWorkoutView.tsx%0A%20%20%20%20%E2%94%9C--%20ExerciseList.tsx%0A%20%20%20%20%E2%94%9C--%20HistoryView.tsx%0A%20%20%20%20%E2%94%9C--%20HomeView.tsx%0A%20%20%20%20%E2%94%9C--%20WorkoutList.tsx%0A%20%20%E2%94%9C--%20%0A%20%20%E2%94%9C--%20hooks%2F%20%20%20%20%20%20%20%20%23%20Custom%20Hooks%20(Business-Logik)%0A%20%20%20%20%E2%94%9C--%20useExerciseManager.ts%0A%20%20%20%20%E2%94%9C--%20useWorkoutManager.ts%0A%20%20%20%20%E2%94%9C--%20useCurrentWorkout.ts%0A%20%20%E2%94%9C--%20%0A%20%20%E2%94%9C--%20locales%2F%20%20%20%20%20%20%20%20%23%20%C3%9Cbersetzungsdateien%20(i18next)%0A%20%20%20%20%E2%94%9C--%20de%2Ftranslation.json%0A%20%20%20%20%E2%94%9C--%20en%2Ftranslation.json%0A%20%20%E2%94%9C--%20types.ts%20%20%20%20%20%20%23%20TypeScript-Typdefinitionen%0A%20%20%E2%94%9C--%20dataManager.ts%20%20%20%20%20%20%23%20Logik%20zur%20lokalen%20Persistenz%20(Capacitor)%0A%20%20%E2%94%9C--%20i18n.ts%20%20%20%20%20%20%23%20i18next-Konfiguration%0A%20%20%E2%94%9C--%20App.tsx%20%20%20%20%20%20%23%20Hauptkomponente%0A%60%60%60%0A%0A%23%23%20Getting%20Started%0A%0A%23%23%23%20Voraussetzungen%0A%0A-%20Node.js%20(%3E=%2014.x)%0A-%20npm%20(oder%20yarn)%0A-%20Android%20Studio%20(wenn%20du%20f%C3%BCr%20Android%20mit%20Capacitor%20baust)%0A-%20Visual%20Studio%20Code%20(empfohlen%20f%C3%BCr%20die%20Entwicklung)%0A%0A%23%23%23%20Installation%0A%0A1.%20Klone%20das%20Repository%3A%0A%0A%60%60%60bash%0Agit%20clone%20https%3A%2F%2Fgithub.com%2Fyour-username%2Fmy-workout-app.git%0Acd%20my-workout-app%0A%60%60%60%0A%0A2.%20Installiere%20die%20Abh%C3%A4ngigkeiten%3A%0A%0A%60%60%60bash%0Anpm%20install%0A%60%60%60%0A%0A3.%20(Optional)%20Installiere%20Capacitor%20global%2C%20falls%20noch%20nicht%20geschehen%3A%0A%0A%60%60%60bash%0Anpm%20install%20-g%20%40capacitor%2Fcli%0A%60%60%60%0A%0A%23%23%20Running%20the%20App%20(Web)%0A%0AStarte%20die%20App%20im%20Entwicklungsmodus%3A%0A%0A%60%60%60bash%0Anpm%20start%0A%60%60%60%0A%0AOeffne%20dann%20%5Bhttp%3A%2F%2Flocalhost%3A3000%5D(http://localhost:3000)%20in%20deinem%20Browser.%0A%0A%23%23%20Production%20Build%0A%0AErzeuge%20das%20Produktions-Build%3A%0A%0A%60%60%60bash%0Anpm%20run%20build%0A%60%60%60%0A%0A%23%23%20Deployment%20auf%20Android%0A%0A1.%20Baue%20die%20React-App%3A%0A%0A%60%60%60bash%0Anpm%20run%20build%0A%60%60%60%0A%0A2.%20Synchronisiere%20das%20Capacitor-Projekt%3A%0A%0A%60%60%60bash%0Anpx%20cap%20sync%20android%0A%60%60%60%0A%0A3.%20Oeffne%20das%20Android-Projekt%20in%20Android%20Studio%20und%20fuehre%20es%20auf%20deinem%20Geraet%20oder%20Emulator%20aus%3A%0A%0A%60%60%60bash%0Anpx%20cap%20open%20android%0A%60%60%60%0A%0A%23%23%20Code%20Formatierung%0A%0AWir%20verwenden%20%5BPrettier%5D(https%3A%2F%2Fprettier.io%2F)%20zur%20automatischen%20Code-Formatierung.%20Unsere%20Einstellungen%20findest%20du%20in%20der%20Datei%20.prettierrc.%20In%20Visual%20Studio%20Code%20kannst%20du%20Format%20On%20Save%20aktivieren%2C%20indem%20du%20folgende%20Einstellungen%20in%20deinen%20settings.json%20hinzuf%C3%BCgst%3A%0A%0A%60%60%60json%0A%7B%0A%20%20%22editor.formatOnSave%22%3A%20true%2C%0A%20%20%22%5Bjavascript%5D%22%3A%20%7B%0A%20%20%20%20%22editor.defaultFormatter%22%3A%20%22esbenp.prettier-vscode%22%0A%20%20%7D%2C%0A%20%20%22%5Btypescript%5D%22%3A%20%7B%0A%20%20%20%20%22editor.defaultFormatter%22%3A%20%22esbenp.prettier-vscode%22%0A%20%20%7D%2C%0A%20%20%22%5Bjson%5D%22%3A%20%7B%0A%20%20%20%20%22editor.defaultFormatter%22%3A%20%22esbenp.prettier-vscode%22%0A%20%20%7D%0A%7D%0A%60%60%60%0A%0A%23%23%20Translations%0A%0ADie%20%C3%9Cbersetzungen%20erfolgen%20mit%20%5Bi18next%5D(https%3A%2F%2Fwww.i18next.com%2F).%20Die%20%C3%9Cbersetzungsdateien%20findest%20du%20in%3A%0A%0A-%20src%2Flocales%2Fen%2Ftranslation.json%0A-%20src%2Flocales%2Fde%2Ftranslation.json%0A%0ABeispiel-Inhalt%20f%C3%BCr%20Englisch%3A%0A%0A%60%60%60json%0A%7B%0A%20%20%22welcome%22%3A%20%22Welcome%20to%20My%20Workout%20App%22%2C%0A%20%20%22menu%22%3A%20%22Menu%22%2C%0A%20%20%22home%22%3A%20%22Home%22%2C%0A%20%20%22exercises%22%3A%20%22Exercises%22%2C%0A%20%20%22workouts%22%3A%20%22Workouts%22%2C%0A%20%20%22current_workout%22%3A%20%22Current%20Workout%22%2C%0A%20%20%22history%22%3A%20%22History%22%2C%0A%20%20%22create_exercise%22%3A%20%22Create%20Exercise%22%2C%0A%20%20%22exercise_name%22%3A%20%22Exercise%20Name%22%2C%0A%20%20%22add_exercise%22%3A%20%22Add%20Exercise%22%2C%0A%20%20%22workout_name_placeholder%22%3A%20%22Workout%20Name%22%2C%0A%20%20%22add_workout%22%3A%20%22Add%20Workout%22%2C%0A%20%20%22start_workout%22%3A%20%22Start%20Workout%22%2C%0A%20%20%22finish_workout%22%3A%20%22Finish%20Workout%22%2C%0A%20%20%22total_exercises%22%3A%20%22Total%20Exercises%22%2C%0A%20%20%22total_workouts%22%3A%20%22Total%20Workouts%22%2C%0A%20%20%22last_workout%22%3A%20%22Last%20Workout%22%2C%0A%20%20%22unknown_exercise%22%3A%20%22Unknown%20Exercise%22%2C%0A%20%20%22set%22%3A%20%22Set%22%2C%0A%20%20%22repetitions_at%22%3A%20%22repetitions%20at%22%2C%0A%20%20%22dark_mode%22%3A%20%22Dark%20Mode%22%2C%0A%20%20%22light_mode%22%3A%20%22Light%20Mode%22%2C%0A%20%20%22add_exercise_to_workout%22%3A%20%22Add%20Exercise%20to%20Workout%22%2C%0A%20%20%22add_exercise_to_workout_button%22%3A%20%22Add%20Exercise%22%2C%0A%20%20%22workout_not_complete%22%3A%20%22Please%20complete%20all%20sets%20before%20finishing%20the%20workout.%22%0A%7D%0A%60%60%60%0A%0A(Der%20deutsche%20Inhalt%20befindet%20sich%20in%20src%2Flocales%2Fde%2Ftranslation.json.)%0A%0A%23%23%20Contributing%0A%0ABitr%C3%A4ge%20sind%20willkommen!%20Bitte%20fork%20das%20Repository%2C%20entwickle%20deine%20%C3%84nderungen%20und%20erstelle%20einen%20Pull%20Request.%0A%0A%23%23%20License%0A%0ADieses%20Projekt%20ist%20unter%20der%20MIT%20License%20lizenziert.%0A%0A%23%23%20Kontakt%0A%0ABei%20Fragen%20oder%20Anregungen%20kannst%20du%20mich%20unter%20%5Byour-email%40example.com%5D(mailto%3Ayour-email%40example.com)%20erreichen.>)

---

Klicke den obigen Link, um die Datei als Text herunterzuladen, oder kopiere den Inhalt in eine lokale Datei namens `README.md`.

Wenn du weitere Anpassungen benötigst, lass es mich wissen!
