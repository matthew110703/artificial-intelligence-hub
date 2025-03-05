import api from "../lib/api";

/** Get all chats of the user */
export const getAllChats = async () => {
  try {
    const response = await api.get("/chat/all");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Get chat by chatId
 * @param {string} chatId
 * @returns {Promise}
 */
export const getChat = async (chatId) => {
  try {
    const response = await api.get(`/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
