import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = new Map();

app.post("/online", (req, res) => {
  const ip = req.ip;
  users.set(ip, Date.now());
  res.sendStatus(200);
});

app.get("/online-count", (req, res) => {
  const now = Date.now();
  for (const [ip, time] of users) {
    if (now - time > 30000) users.delete(ip);
  }
  res.json({ online: users.size });
});

app.listen(3000, () => console.log("✅ Сервер запущен: http://localhost:3000"));
