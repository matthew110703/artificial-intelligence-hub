import { Router } from "express";

// Controllers
import { getChats, getChatById } from "../controllers/chatController.js";

const chatRoutes = Router();

// Middleware
import authenticate from "../middleware/authenticate.js";
chatRoutes.use(authenticate);

// Routes
chatRoutes.get("/all", getChats);
chatRoutes.get("/:id", getChatById);

export default chatRoutes;
