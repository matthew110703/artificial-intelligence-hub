/* eslint-disable react/prop-types */

import { FaRobot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ text, role, isLoading = false }) {
  const isBot = role === "model";

  return (
    <div
      className={`flex gap-x-2 items-center justify-start ${
        isBot ? "" : "flex-row-reverse justify-start"
      }`}
    >
      {isBot ? <FaRobot size={32} /> : <FaUser size={24} />}
      <div
        className="bg-primary w-auto h-auto py-2 px-3 text-white rounded-3xl shadow border-b-2"
        style={{ maxWidth: "80%" }}
      >
        {isLoading ? (
          <img
            src="/media/loading-dot.gif"
            alt="loading"
            width={32}
            height={18}
          />
        ) : (
          <ReactMarkdown>{text}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
