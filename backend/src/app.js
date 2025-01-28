import express from "express";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Artificial Intelligence Hub API");
});

export default app;
