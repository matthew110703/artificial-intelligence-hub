import { createServer } from "http";
import app from "./app.js";
import connectDB from "./lib/connectDB.js";
import { Server } from "socket.io";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Create HTTP server
const server = createServer(app);

// Socket IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Chat Controller
import { socketAIChatManager } from "./controllers/chatController.js";
socketAIChatManager(io); // Passing Socket IO instance

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
