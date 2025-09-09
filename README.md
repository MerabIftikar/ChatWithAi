🤖 AI Chatbot – Full Project (Frontend + Backend)

This project is a simple AI Chatbot built with:

Backend: Node.js + Express (server that connects to Google Gemini AI)

Frontend: React (user chat interface)

The chatbot lets a user send a message from the frontend → backend → Gemini AI → and shows the AI’s response back in the chat screen.

📖 Overview – How It Works

User types a message in the frontend chat screen.

The message is sent to the backend (/chat API).

Backend sends the text to Google Gemini AI using an API Key.

Gemini AI generates a smart response.

Backend receives the AI reply and sends it back to the frontend.

Frontend shows the reply in the chat window.

📂 Project Structure
📦 AI-Chatbot-Project
 ┣ 📂 backend/   → Node.js + Express server
 ┃ ┗ server.js  → Connects with Google Gemini API
 ┣ 📂 frontend/  → React app (chat UI)
 ┃ ┗ App.js     → Simple chat screen
 ┗ README.md    → Full documentation

⚙️ Requirements

Node.js installed

npm (comes with Node)

Google Gemini API Key (from Google AI Studio
)

🚀 Setup Guide
🔹 Step 1: Backend

Go inside backend/ folder.

Install required packages (express, cors, node-fetch).

Put your Google Gemini API Key in the backend code.

Start backend server → it runs on http://localhost:5000
.

🔹 Step 2: Frontend

Go inside frontend/ folder.

Run the React app (npm start).

It opens on http://localhost:3000
.

Frontend is connected with backend at port 5000.

🔄 How to Use

Start backend (node server.js).

Start frontend (npm start).

Open http://localhost:3000
 in browser.

Type a message in the input box.

AI will reply within a few seconds.

📌 Example Conversation

User: Hello AI!

AI: Hi there 👋 How can I help you today?

🧑‍🎓 Notes for Students

Backend = Brain → Talks to Google Gemini AI.

Frontend = Face → Shows chat to the user.

API Key = Password → Needed to access Gemini AI.

Never put your API Key inside frontend code. Keep it safe in backend.

📝 Summary

Project is split into two parts (backend + frontend).

User → Frontend → Backend → AI → Backend → Frontend → User.

Easy to run with just node server.js + npm start.
