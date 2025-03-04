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
    const res = await api.post(
      "/ai/generate-speech",
      { text, voiceId },
      { responseType: "blob" },
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
