import axios from "axios";
import api from "../lib/api";

/**
 * Generate Images from prompt
 * @param {string} prompt
 * @returns {Promise}
 */
export const generateImage = async (prompt) => {
  try {
    const res = await api.post("/ai/generate-image", { prompt });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Generate Email from prompt
 * @param {string} prompt
 * @returns {Promise}
 */
export const generateEmail = async (prompt) => {
  try {
    const res = await api.post("/ai/generate-email", { prompt });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Get list of voices */
export const getVoiceList = async () => {
  try {
    const res = await api.get("/ai/voices");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Generate Speech from text
 * @param {string} text
 * @param {string} voiceId
 * @returns {Promise}
 */
export const generateSpeech = async (text, voiceId) => {
  try {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    const res = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 1,
          use_speaker_boost: true,
        },
      },
      {
        params: {
          output_format: "mp3_44100_128",
        },
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        responseType: "blob",
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
