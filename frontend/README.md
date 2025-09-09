# video-downloader-app
React Native + Node.js app to download videos using yt-dlp
📱 Online Video Downloader – Frontend

This is the frontend (mobile app) of the Online Video Downloader project.
It is made with React Native.
This app lets you paste a video link and download it to your phone.

✨ Features

Paste a video link and click Download

Show download progress in notification bar

Save video in Downloads/videos folder

Works on Android phones

📂 Files in Frontend
frontend/
│
├── VideoDownloader.tsx   → Main screen of app
├── package.json          → List of dependencies (libraries)
└── README.md             → This help file

⚙️ Setup Steps

Follow these steps one by one:

1️⃣ Install Node Modules

Open terminal inside frontend/ and run:

npm install


This will install all required libraries.

2️⃣ Install Extra Libraries

Run these commands:

npm install react-native-fs @notifee/react-native
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context


If you are using Expo:

expo install react-native-fs
expo install @notifee/react-native

3️⃣ Give Storage Permission (Android)

Open this file:

android/app/src/main/AndroidManifest.xml


Add these lines inside:

<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />


This allows the app to save videos on your phone.

4️⃣ Add Notification Icon

Go to:

android/app/src/main/res/drawable/


Put one icon file named:

ic_launcher.png


This icon will show in notifications.

▶️ How to Run

Start Metro bundler:

npm start


Run app on Android:

npm run android

🔔 How the App Works

User writes or pastes a video link.

App sends this link to backend server.

Backend server gives a downloadable video URL.

App downloads video with react-native-fs.

Notifee notification shows progress (e.g., 10%, 50%, 100%).

When complete → shows Download Complete message.

📦 Used Libraries

react-native-fs → For saving video in phone storage.

@notifee/react-native → For showing notifications.

@react-navigation/native → For navigation between screens.

@react-navigation/stack → For stack navigation.

react-native-screens + react-native-safe-area-context → Needed for navigation.

⚠️ Important Notes

Works only on real Android phone, not emulator.

Backend must be running (you will set it later).

Change backend IP in VideoDownloader.tsx to your computer IP. Example:

const backendResponse = await fetch("http://192.168.1.20:5000/download", { ... });