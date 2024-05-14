# Description
The Chat app provides users with a chat interface and the option to share images and their location. It was built for mobile devices using React Native, Expo, the Gifted Chat library, and Google Firestore Database. Users are anonymously authenticated via Google Firebase and images uploaded by users are stored in Firebase Cloud Storage.

# Features
* Start page lets users enter their name and choose a background color for their chat screen
* Chat screen that displays the conversation, an input field, and a submit button
* Provides users the ability to send images and location data
* Data is stored online and offline

# Dependencies
* **React Native** --- JavaScript framework used to write native mobile apps
* **Expo** --- Development environment for developing React Native apps
* **Google Firebase** --- Data-storage platform for native apps
* **Gifted Chat library** --- Popular chat UI library
* **AsyncStorage** --- Persistent, key-value storage system; used instead of LocalStorage

# To Use
* Download ZIP file and extract the project, or clone the repo 
* Using a CLI (e.g. Terminal or Powershell), navigate to the project root folder
* Install Node.js, npm, and expo if you do not already have them, the versions used for this project were:
  * 18.20.2 (node)
  * 10.7.0 (npm)
  * 0.18.10 (expo, installed via `npm install -g expo-cli`)
* Run `npm install` to install the dependencies
* Run `npx expo start` to start the app
  * Run on either an emulator or simulator (e.g. Android Studio or xCode)
  * Or install Expo Go app on your own device and scan the QR code provided by Metro Bundler
