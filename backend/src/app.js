import express from "express";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Artificial Intelligence Hub API");
});

// Routes
// API Status
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    message: "Welcome to Artificial Intelligence Hub API",
    appName: "Artificial Intelligence Hub API",
    version: "1.0.0",
    server: "Node.js",
    date: new Date(),
  });
});

export default app;
