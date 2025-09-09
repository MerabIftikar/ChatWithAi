const express = require("express");
const cors = require("cors");

// node-fetch dynamic import fix
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// ====== CHATBOT PART ======
// 👉 Replace with your API key from Google AI Studio
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    const MODEL_NAME = "gemini-1.5-flash"; // fast + cheaper
    const API_VERSION = "v1beta";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini Response:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 Sorry, no response from AI";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to connect to Gemini API" });
  }
});

// ====== START SERVER ======
app.listen(5000, () =>
  console.log("🚀 Chatbot server running on http://localhost:5000")
);
