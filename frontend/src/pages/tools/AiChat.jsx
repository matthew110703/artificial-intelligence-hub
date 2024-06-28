/* eslint-disable react/no-unescaped-entities */
import { IoSend } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import MessageBubble from "../../components/MessageBubble";
import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../../../utils/ai-services";

export default function AiChat() {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);

  const handleSendMsg = async () => {
    const newMsg = {
      role: "user",
      parts: [{ text: userMsg }],
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setUserMsg("");
    setIsLoading(true);

    try {
      const botResponse = await chatWithAI(userMsg, [...messages, newMsg]);
      const botReply = {
        role: "model",
        parts: [{ text: botResponse }],
      };
      setIsLoading(false);

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      setIsLoading(false);
      alert(
        "Error fetching AI response. Check your network connection.",
        error
      );
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-row bg-primary my-3 p-3 w-3/4 mx-auto shadow rounded items-center border-b-4">
        <button
          className="px-3 py-2 bg-secondary flex items-center gap-2 rounded-md text-white font-semibold"
          onClick={() => setMessages([])}
        >
          New Chat
          <MdEditSquare />
        </button>
        <div className="mx-auto flex items-center gap-5">
          <p className="text-3xl align-middle font-semibold ">Chat with AI</p>
          <img
            src="/media/chat.png"
            alt="Chat Icon"
            className="aspect-auto"
            width={120}
            height={120}
          />
          <p className="text-xs font-semibold">
            AI-enhanced,
            <br /> Trusty Companion...
          </p>
        </div>
      </div>

      {/* CHAT INTERFACE  */}
      <div
        className="flex flex-col gap-5 bg-primary my-5 p-3 mx-auto rounded-md"
        style={{ width: "60%", height: "680px" }}
      >
        {messages.length === 0 && (
          <p className="text-center">
            Start chatting with the AI by typing a message and pressing "Enter"
            or clicking the send button.
          </p>
        )}
        {/* CHATTING SCREEN  */}
        <div
          className="basis-11/12 flex flex-col gap-y-3 p-2 bg-secondary w-full overflow-y-scroll overscroll-contain scroll-smooth"
          ref={chatRef}
        >
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} text={msg.parts[0].text} role={msg.role} />
          ))}
          {/* Show loading animation */}
          {isLoading && (
            <MessageBubble role="model" isLoading={isLoading} />
          )}{" "}
        </div>

        <div className="flex flex-row gap-x-5 items-center justify-center">
          <input
            type="text"
            placeholder="Type your message here..."
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") handleSendMsg(); // Send message on Enter key press
            }}
            className="bg-accent-2 w-2/3 h-full rounded-3xl text-lg px-3 py-2"
          />
          <button
            className="bg-white rounded-full p-3 hover:scale-105 transition ease-out duration-150"
            onClick={handleSendMsg}
          >
            <IoSend size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
