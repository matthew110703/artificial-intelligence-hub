import jwt from "jsonwebtoken";

// Models
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

// AI Model Config
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @param {import('socket.io').Server} io
 */
export const socketAIChatManager = (io) => {
  const chatNamespace = io.of("/chat");
  let chatHistory = []; // Chat History for each user session (saved in memory)

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.5,
    },
  });

  // Middleware for authenticating users
  chatNamespace.use(async (socket, next) => {
    try {
      const {
        token,
        chatId,
        isGuest = false,
        newChat = false,
      } = socket.handshake.auth;

      // Check if user is guest
      if (isGuest) {
        socket.isGuest = true;
        return next();
      }

      // Check if user is guest and no token is provided
      if (!token) {
        return next(new Error("NoTokenProvided"));
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return next(new Error("InvalidToken"));
      }

      // User
      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        return next(new Error("UserNotFound"));
      }
      socket.user = user;

      // Check if chat exists or create new chat
      if (newChat) {
        const chat = new Chat({
          user: user._id,
          history: [],
        });
        await chat.save();
        socket.chatId = chat._id;
        return next();
      }

      // Fetch existing chat
      const chat = await Chat.findById(chatId, {
        "history._id": 0,
        "history.createdAt": 0,
        "history.updatedAt": 0,
        "history.parts._id": 0,
      });

      if (!chat) {
        return next(new Error("ChatNotFound"));
      }

      if (chat.user.toString() !== user._id.toString()) {
        return next(new Error("AuthenticationError: Invalid Chat ID"));
      }

      socket.chatId = chat._id;

      // Load chat history to memory
      for (const item of chat.history) {
        chatHistory.push(item);
      }

      return next();
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.log("Error", error);
      return next(error);
    }
  });

  // Connection event
  chatNamespace.on(
    "connection",
    /** @param {import('socket.io').Socket} socket */
    async (socket) => {
      try {
        if (process.env.NODE_ENV === "development")
          console.log("New client connected");

        // Start chat
        const chat = model.startChat({ history: chatHistory });

        socket.on("message", async (message) => {
          // User's message
          chatHistory.push({ role: "user", parts: [{ text: message }] }); // Save user's message to chat history

          // Send Message to AI Model and get response stream
          const msgResult = await chat.sendMessageStream(message);

          try {
            let msg = ""; // For Saving complete message(response) from AI
            socket.emit("loading", true); // Send loading status to client
            // Streaming the response to client
            for await (const chunk of msgResult.stream) {
              const chunkText = chunk.text();
              msg += chunkText;
              socket.emit("message", chunkText); // Send AI's message to client
            }
            socket.emit("loading", false); // Send loading status to client

            // AI's message
            chatHistory.push({ role: "model", parts: [{ text: msg }] }); // Save AI's message to chat history
          } catch (error) {
            if (process.env.NODE_ENV === "development")
              console.error("Error", error);
            socket.emit("error", error.message);
          }
        });

        socket.on("disconnect", async () => {
          if (process.env.NODE_ENV === "development")
            console.log("Client disconnected");

          // If user is guest, don't save chat history
          if (!socket.isGuest) {
            await Chat.findByIdAndUpdate(socket.chatId, {
              history: chatHistory,
            })
              .then(() => console.log("Chat history saved"))
              .catch((error) => {
                if (process.env.NODE_ENV === "development")
                  console.error("Error saving chat history", error);
              });
          }
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.log("Error", error);
        socket.emit("error", error.message);
      }
    }
  );
};

/**
 * Get All Chats of the user
 */
export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).populate(
      "user",
      "-password"
    );
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Chat by ID
 */
export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id).populate(
      "user",
      "-password"
    );
    if (!chat) {
      throw {
        statusCode: 404,
        name: "Chat not found",
        message: `Instance with ID ${req.params.id} not found`,
      };
    }
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
