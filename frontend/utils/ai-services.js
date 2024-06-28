/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { emailPrompt } from "./data";
import axios from "axios";

// eslint-disable-next-line no-undef
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const chatWithAI = async (msg, history) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const generationConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 50,
    maxOutputTokens: 250,
  };

  const modifiedPrompt = `Limit the response in about 50-70 words max for the following if it requires more than 70 words to summarize: ${msg}`;

  const chat = model.startChat({
    history: history,
    generationConfig: generationConfig,
  });

  const result = await chat.sendMessage(modifiedPrompt);
  const res = result.response.text();

  return res;
};

export const emailWriter = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const generationConfig = {
    temperature: 1,
    topP: 0.9,
    topK: 50,
    maxOutputTokens: 500,
  };

  const modifiedPrompt = `So here are the specific details for the email: Subject/Purpose of the email: ${
    prompt.subject
  }, ${prompt.recipient && "Recipient: " + prompt.recipient}, ${
    prompt.recipientOrg && "Recipient's Organisation: " + prompt.recipientOrg
  } , Specific Prompt: ${prompt.prompt}`;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: emailPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Absolutely! I can draft those engaging emails for you. To get started, I'll need some specific information about each scenario.",
          },
        ],
      },
    ],
    generationConfig: generationConfig,
  });

  const result = await chat.sendMessage(modifiedPrompt);
  const res = result.response.text();

  return res;
};

export const textToSpeech = async (text, voiceId) => {
  const options = {
    method: "POST",
    headers: {
      "xi-api-key": import.meta.env.VITE_ELEVEN_LABS_API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    data: `{"text":"${text}","voice_settings":{"stability":0.5,"similarity_boost":1,"use_speaker_boost":true}}`,
    responseType: "blob",
  };

  const response = await axios(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    options
  );

  if (response.status !== 200) {
    throw new Error("Error generating audio");
  }

  return response.data;
};

export const textToImage = async (prompt) => {
  const options = {
    method: "POST",
    url: "https://text-to-image13.p.rapidapi.com/",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
      "x-rapidapi-host": "text-to-image13.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      prompt: prompt,
    },
    responseType: "arraybuffer",
  };

  try {
    const response = await axios(options);

    const blob = new Blob([response.data], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    return url;
  } catch (e) {
    throw new Error("Error generating image. Please try again later.");
  }
};
