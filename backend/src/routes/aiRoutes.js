import { Router } from "express";

// Controllers
import {
  getVoices,
  textToSpeech,
  generateEmail,
  generateImage,
} from "../controllers/aiController.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const aiRoutes = Router();

// Text-to-speech AI routes
aiRoutes.get("/voices", getVoices);
aiRoutes.post("/generate-speech", authenticate, textToSpeech);

// Email AI routes
aiRoutes.post("/generate-email", authenticate, generateEmail);

// Text to Image AI routes
aiRoutes.post("/generate-image", authenticate, generateImage);

export default aiRoutes;
