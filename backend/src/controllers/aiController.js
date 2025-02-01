// Text-to-speech AI controller
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

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

    // Response Type
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
    });

    // Convert Text to Speech
    const audio = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    audio.pipe(res);
  } catch (error) {
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

const url = {
  task: "https://ai-image-generating.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/finalimage.php",
  getImage:
    "https://ai-image-generating.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/getimage.php",
};
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": "ai-image-generating.p.rapidapi.com",
  },
};

/**
 * Polling for Images to be generated
 * @param {Object} payload
 * @param {String} payload.task_id
 * @param {String} payload.token
 * @returns
 */
const pollImages = async (payload) => {
  try {
    const startTime = Date.now();

    while (true) {
      const fetchImage = await fetch(url.getImage, {
        ...options,
        body: JSON.stringify(payload),
      });

      const { result: imageResult } = await fetchImage.json();

      const status = imageResult?.data?.queue_info?.status;

      if (status === "success") {
        return imageResult?.data?.results;
      }

      if (Date.now() - startTime > 60000) {
        throw new Error("Image generation timed out. Please try again.");
      }
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error) {
    throw error;
  }
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
        message: "Please provide a prompt",
      });
    }

    // Assigning Task
    const task = await fetch(url.task, {
      ...options,
      body: JSON.stringify({
        prompt,
        style_id: 2,
        size: "1-1",
      }),
    });

    const { token, result } = await task.json();
    const { task_id } = result;

    // Delay for 5 seconds before polling
    await Promise.all([new Promise((resolve) => setTimeout(resolve, 5000))]);

    // Polling for Images
    const images = await pollImages({ task_id, token });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    next(error);
  }
};
