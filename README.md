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


Contributing
Beiträge sind willkommen! Bitte fork das Repository, entwickle deine Änderungen und erstelle einen Pull Request.

License
Dieses Projekt ist unter der MIT License lizenziert.

