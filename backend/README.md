This is a simple Node.js + Express backend that connects to Google Gemini AI (via API key from Google AI Studio).
It provides a single /chat endpoint for sending user messages and receiving AI-generated replies.

🚀 Features

Simple Express server

Connects to Google Gemini AI using API Key

Accepts user messages via /chat

Returns chatbot responses in JSON format

📦 Installation

Clone or create a new project folder.

Inside the folder, create server.js with the provided code.

Install dependencies:

npm init -y
npm install express cors node-fetch

🔑 Setup API Key

Go to Google AI Studio
.

Generate your API Key.

Open server.js and replace this line with your key:

const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

▶️ Running the Server

Start the backend server:

node server.js


Server will run at:

http://localhost:5000

📡 API Endpoints
POST /chat

Send a user message and get a response from the AI.

Request:

POST http://localhost:5000/chat
Content-Type: application/json


Body:

{
  "message": "Hello AI, how are you?"
}


Response:

{
  "reply": "Hi! I'm doing great, how about you?"
}

🛠️ Example with Fetch (Frontend)
async function sendMessage(message) {
  const res = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  console.log("AI Reply:", data.reply);
}

📌 Notes

Uses Gemini 1.5 Flash (fast & cheaper).

You can change model in server.js:

const MODEL_NAME = "gemini-1.5-pro"; // more advanced
