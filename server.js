const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// test route
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server chạy: http://localhost:${PORT}`);
});
