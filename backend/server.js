const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ====== VIDEO DOWNLOAD PART ======
const videosDirectory = path.join(__dirname, "videos");

// Make videos folder if not exist
if (!fs.existsSync(videosDirectory)) {
  fs.mkdirSync(videosDirectory);
}

// Serve videos in browser
app.use("/videos", express.static(videosDirectory));

app.post("/download", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  const fileName = `video_${Date.now()}.mp4`;
  const outputFile = path.join(videosDirectory, fileName);

  // Path of yt-dlp.exe (must be inside project folder)
  const ytDlpPath = path.join(__dirname, "yt-dlp.exe");

  const ytdlp = spawn(ytDlpPath, [
    "-f",
    'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]',
    url,
    "-o",
    outputFile,
  ]);

  ytdlp.stdout.on("data", (data) => {
    console.log(`yt-dlp: ${data}`);
  });

  ytdlp.stderr.on("data", (data) => {
    console.error(`yt-dlp error: ${data}`);
  });

  ytdlp.on("close", (code) => {
    if (code === 0) {
      console.log("Download finished on server!");
      const videoUrl = `http://192.168.1.20:5000/videos/${fileName}`;
      res.status(200).json({ message: "Video downloaded on server", videoUrl });
    } else {
      console.error(`yt-dlp failed with code ${code}`);
      res.status(500).json({ error: "yt-dlp failed" });
    }
  });
});

// ====== START SERVER ======
app.listen(5000, () =>
  console.log(" Server running on http://localhost:5000")
);
