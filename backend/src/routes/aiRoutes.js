import { Router } from "express";

// Controllers
import {
  getVoices,
  textToSpeech,
  generateEmail,
  generateImage,
} from "../controllers/aiController.js";

const aiRoutes = Router();

// Text-to-speech AI routes
aiRoutes.get("/voices", getVoices);
aiRoutes.post("/generate-speech", textToSpeech);

// Email AI routes
aiRoutes.post("/generate-email", generateEmail);

// Text to Image AI routes
aiRoutes.post("/generate-image", generateImage);

export default aiRoutes;
