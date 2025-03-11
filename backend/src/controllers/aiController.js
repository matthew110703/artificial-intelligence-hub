// Text-to-speech AI controller
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

async function generateSpeech(text, voiceId) {
  try {
    const audio = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 1,
        use_speaker_boost: true,
      },
    });

    return audio;
  } catch (error) {
    console.error("Error in generateSpeech:", error);
    throw error;
  }
}

/**
 * Get all voices available
 */
export const getVoices = async (req, res, next) => {
  try {
    const voices = await client.voices.getAll();

    // Filtering
    let response = [];
    voices.voices.forEach((voice) => {
      response.push({
        id: voice.voice_id,
        name: voice.name,
        labels: voice.labels,
        preview_url: voice.preview_url,
      });
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Convert Text to Speech
 */
export const textToSpeech = async (req, res, next) => {
  const { voiceId, text } = req.body;

  try {
    // Validate Inputs
    if (!voiceId || !text) {
      return res.status(400).json({
        message: "Please provide voiceId and text",
      });
    }

    console.log("Voice ID:", voiceId);
    console.log("Text:", text);
    console.log("API Key:", process.env.ELEVENLABS_API_KEY); //Added Log.

    // Convert Text to Speech
    const audio = await generateSpeech(text, voiceId);

    // Response Type
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
    });

    audio.pipe(res);
  } catch (error) {
    console.error("Error in textToSpeech:", error); // Log the error
    next(error);
  }
};

// Email Generation
import { GoogleGenerativeAI } from "@google/generative-ai";
import { emailSchema } from "../lib/helpers.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate Email
 */
export const generateEmail = async (req, res, next) => {
  const { prompt } = req.body;

  try {
    // Validate Inputs
    if (!prompt) {
      return res.status(400).json({
        message: "Please provide a prompt",
      });
    }

    // Model Configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: emailSchema,
      },
      systemInstruction: "You are professional email writer.",
    });

    const modifiedPrompt = `
    Compose an email and generate upto 3-5 email subject titles suited to the given purpose, maintaining an appropriate tone and structure. Ensure clarity, professionalism, or friendliness as needed. Provide necessary details while keeping the message concise and engaging. Adapt the language to fit the recipient and context, making the email effective and well-received. 
    Here is the specific prompt: ${prompt}
    `;
    const result = await model.generateContent(modifiedPrompt);

    res.send(result.response.text());
  } catch (error) {
    next(error);
  }
};

// Text to Image Generation
const url =
  "https://ai-image-generating.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": "ai-image-generating.p.rapidapi.com",
  },
};

/**
 * Generate Image
 */
export const generateImage = async (req, res, next) => {
  const { prompt } = req.body;

  try {
    // Validate Inputs
    if (!prompt) {
      return res.status(400).json({
        error: "Please provide a prompt",
      });
    }

    // Assigning Task
    const task = await fetch(url, {
      ...options,
      body: JSON.stringify({
        prompt,
        style_id: 2,
        size: "1-1",
      }),
    });

    const { final_result, error } = await task.json();
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    res.json({
      success: true,
      images: final_result,
    });
  } catch (error) {
    next(error);
  }
};
