Here’s a complete README.md for your backend project. I’ve written it step by step so even a beginner (or a "child" 😅) can follow and make it work perfectly.

🎥 Video Downloader Backend (Node.js + yt-dlp)

This is a simple backend server built with Express.js that allows you to download videos from websites (like YouTube) using yt-dlp.
The videos are stored in a local videos/ folder and can be accessed directly in the browser.

🚀 Features

Download videos from any supported site using yt-dlp.

Automatically saves videos to the videos/ folder.

Serves downloaded videos at http://your-ip:5000/videos/filename.mp4.

Simple REST API (/download) for triggering downloads.

Works on Windows/Linux/Mac (make sure you have yt-dlp installed or included).

📦 Requirements

Node.js
 (v14 or higher recommended)

yt-dlp
 (already included as yt-dlp.exe in the project folder if on Windows)

Internet connection 😉

⚙️ Installation

Clone this repo or copy files

git clone https://github.com/yourusername/video-downloader-backend.git
cd video-downloader-backend


Install dependencies

npm install


Add yt-dlp

If you are on Windows:
Place yt-dlp.exe inside the project folder.
You can download it from: yt-dlp.exe Releases

If you are on Linux/Mac:
Install globally:

sudo apt install ffmpeg python3
pip install yt-dlp


And change the ytDlpPath in server.js to "yt-dlp" instead of yt-dlp.exe.

▶️ Running the Server

Start the server with:

node server.js


You should see:

Server running on http://localhost:5000

🌐 API Endpoints
1. Download Video

URL: POST http://<your-ip>:5000/download

Headers: Content-Type: application/json

Body:

{
  "url": "https://www.youtube.com/watch?v=example"
}


Response (on success):

{
  "message": "Video downloaded on server",
  "videoUrl": "http://192.168.1.20:5000/videos/video_1694290445567.mp4"
}


Response (on error):

{
  "error": "yt-dlp failed"
}

2. Access Downloaded Videos

All downloaded videos are available at:

http://<your-ip>:5000/videos/<file-name>.mp4


Example:

http://192.168.1.20:5000/videos/video_1694290445567.mp4

📂 Project Structure
video-downloader-backend/
│── server.js        # Main backend server
│── yt-dlp.exe       # yt-dlp binary (for Windows)
│── videos/          # Folder where downloaded videos are saved
│── package.json     # Node dependencies
│── README.md        # Project documentation

🛠 Troubleshooting

yt-dlp not found error
→ Make sure yt-dlp.exe is in the same folder OR install yt-dlp globally.

Permission denied (Linux/Mac)
→ Run chmod +x yt-dlp to make it executable.

Server works but no download
→ Ensure ffmpeg is installed (needed for merging video/audio):

sudo apt install ffmpeg

👦 Example (Step by Step for Beginners)

Open Command Prompt/Terminal.

Run:

node server.js


Open Postman/Insomnia OR a simple frontend and send a POST request:

{ "url": "https://www.youtube.com/watch?v=abc123" }


Wait until "Download finished on server!" appears in terminal.

Open browser and go to:

http://localhost:5000/videos/yourvideo.mp4


🎉 Your video is ready!