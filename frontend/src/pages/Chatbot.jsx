/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from "react";

// UI
import { Container, Sidebar, Icon } from "../components";

// Icons
import { geminiIcon, upArrow } from "../assets";
import Bubble from "../components/ui/Bubble";

// Socket
import useSocketManager from "../components/hooks/useSocketManager";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../store/chatSlice";

// UUID
import { v4 as uuid } from "uuid";

// Motion
import { motion } from "motion/react";
import { fadeIn, fadeInUp } from "../lib/motion";

const Chatbot = () => {
  // Socket.io
  /** @type {import("socket.io-client").Manager} */
  const manager = useSocketManager();
  const socket = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const { chatId, history } = useSelector((state) => state.chat);
  const { isGuest, token } = useSelector((state) => state.auth);

  // Local State
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log(chatId);
  // }, [chatId]);

  // Scroll to bottom on new message
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      });
    }
  }, [history, loading, error]);

  // Socket Event Handlers
  // Handle Connection
  const handleReconnect = useCallback(() => {
    if (!manager) return;

    if (socket.current) socket.current.disconnect();

    socket.current = manager.socket("/chat", {
      auth: {
        chatId: chatId,
        isGuest,
        token,
      },
    });

    socket.current.on("connect", () => {
      console.log("Connected to Chatbot");
    });
  }, [manager]);

  // Handle Message
  const handleMessage = useCallback(
    (message) => {
      dispatch(
        newMessage({
          id: uuid(),
          role: "model",
          parts: [{ text: message }],
        }),
      );
    },
    [dispatch],
  );

  // Handle Loading
  const handleLoading = useCallback((loading) => {
    setLoading(loading);
  }, []);

  // Handle Error
  const handleError = useCallback((err) => {
    console.error(err);
    setError(err);
  }, []);

  // Initialize Socket Connection and Listeners
  useEffect(() => {
    if (!manager) return;

    handleReconnect();
    if (socket.current) {
      socket.current.on("message", handleMessage);
      socket.current.on("loading", handleLoading);
      socket.current.on("error", handleError);
      socket.current.on("disconnect", () => {
        console.log("Disconnected from Chatbot");
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("message", handleMessage);
        socket.current.off("loading", handleLoading);
        socket.current.off("error", handleError);
        socket.current.disconnect();
      }
    };
  }, [handleReconnect, handleError, handleMessage, manager, handleLoading]);

  // Listen for messages
  const sendMessage = (e) => {
    if (e && e.preventDefault) e.preventDefault(); // Prevent default if event exists
    if (!text.trim() || !socket.current) return;

    dispatch(newMessage({ id: uuid(), role: "user", parts: [{ text }] }));
    socket.current.emit("message", text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setText((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex gap-8">
      <Sidebar handleReconnect={handleReconnect} />
      <Container disableFooter>
        <main>
          {/* Chat Interface */}
          <section className="h-full space-y-2 px-2 py-4">
            {/* Chat Messages */}
            <div
              ref={containerRef}
              className="mini-scrollbar mx-auto flex h-[70vh] flex-col gap-3 overflow-y-auto scroll-smooth p-1 md:p-4 lg:h-[75vh] lg:w-[80%] lg:gap-6"
            >
              {history.length === 0 && (
                <motion.p
                  className="m-auto text-center text-xl text-gray-500 lg:w-1/2 lg:text-2xl"
                  variants={fadeIn}
                  {...fadeIn}
                >
                  What's on your mind? Ask me anything! I'm here to help you
                  with anything you need. 😊
                </motion.p>
              )}

              {history.map((msg) => (
                <Bubble
                  key={msg._id || msg.id}
                  role={msg.role}
                  content={msg?.parts[0].text}
                />
              ))}
              {loading && <Bubble role="model" content="Thinking..." />}
              {error && <Bubble role="model" content="An error occurred" />}
            </div>

            <motion.form
              onSubmit={sendMessage}
              className="ring-primary shadow-primary fixed bottom-2 left-0 mt-4 w-full space-y-1.5 self-end rounded-lg p-1.5 shadow-sm focus-within:shadow-md focus-within:ring-2 lg:static lg:mx-auto lg:w-[80%]"
              variants={fadeInUp}
              {...fadeInUp}
            >
              {/* Chat Input */}
              <textarea
                type="text"
                placeholder="Ask AI..."
                className="field-sizing-content max-w-full min-w-full bg-transparent p-1.5 outline-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
              <div className="flex items-center justify-between">
                {/* AI Model Info */}
                <aside className="bg-primary/25 flex items-center gap-2 rounded-full px-1.5 py-0.5">
                  <Icon src={geminiIcon} size={16} alt={"Gemini"} />
                  <p className="text-xs font-semibold">Gemini Flash 1.5</p>
                </aside>

                {/* Send Button */}
                <button
                  type="submit"
                  className="bg-primary rounded-full p-1.5"
                  aria-label="Send Message"
                >
                  <Icon src={upArrow} size={16} alt={"Send"} />
                </button>
              </div>
            </motion.form>
          </section>
        </main>
      </Container>
    </div>
  );
};

export default Chatbot;
