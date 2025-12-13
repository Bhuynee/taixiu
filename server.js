const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// đọc users
function readUsers() {
  return JSON.parse(fs.readFileSync("users.json", "utf8"));
}

// ghi users
function writeUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

// test
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

// đăng ký
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username]) {
    return res.json({ success: false, msg: "Tài khoản đã tồn tại" });
  }

  users[username] = {
    password,
    xu: 0,
    history: []
  };

  writeUsers(users);
  res.json({ success: true });
});

// đăng nhập
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (!users[username] || users[username].password !== password) {
    return res.json({ success: false });
  }

  res.json({ success: true, xu: users[username].xu });
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy: http://localhost:${PORT}`);
});
