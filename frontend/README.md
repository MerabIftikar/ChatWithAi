📱 Chat App – Frontend (React Native CLI)

This is the frontend of a simple chat application built with React Native (CLI setup).
The app lets users send a message and receive an AI-generated reply (via backend API).

✨ Features

📩 Send messages from mobile app

🤖 Get AI response from backend

🎨 Simple & modern chat UI

📱 Works on Android (and iOS if configured)

📦 Dependencies

This project uses the following main libraries:

React Native
 – Mobile framework

Axios
 – For API requests

⚙️ Requirements

Before running this project, make sure you have:

✅ Node.js (v18+ recommended) → Download

✅ React Native CLI installed → Guide

✅ Android Studio (for emulator) OR a real Android phone with USB debugging enabled

✅ Backend server running on your computer (Node.js Express app on port 5000)

⚠️ Important: In ChatScreen.tsx, update the backend API link:

const res = await axios.post("http://192.168.1.20:5000/chat", { message: input });


Replace 192.168.1.20 with your computer’s local IP (find it with ipconfig on Windows or ifconfig on Mac/Linux).
This allows your phone/emulator to communicate with the backend.

🚀 Installation & Setup
1️⃣ Clone the Repo
git clone https://github.com/YourUsername/chat-app.git
cd chat-app/frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run on Android Emulator
npx react-native run-android


Or, if using a real device (USB debugging enabled):

npx react-native start


and then run the app manually from Android Studio or your device.

📂 Project Structure
frontend/
│── ChatScreen.tsx   # Main chat UI & logic
│── package.json     # Dependencies list
│── README.md        # Documentation (this file)

🔑 API Details

The frontend communicates with backend using:

Endpoint: POST /chat

Request Body:

{
  "message": "Hello AI!"
}


Response:

{
  "reply": "This is AI reply to: Hello AI!"
}

🛠️ Notes

Backend server must be running before you use the app.

If backend is off, you will see the error message:

Error connecting to server

📜 License

This project is for learning purposes. Free to use and modify.
