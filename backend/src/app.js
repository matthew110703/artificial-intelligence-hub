import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Artificial Intelligence Hub API");
});

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

// Error Handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

export default app;
