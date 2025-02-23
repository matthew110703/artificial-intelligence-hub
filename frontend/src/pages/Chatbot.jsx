import { useState } from "react";

// UI
import { Container, Sidebar, Icon } from "../components";

// Icons
import { geminiIcon, upArrow } from "../assets";
import Bubble from "../components/ui/Bubble";

const Chatbot = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!text) return;
    setChat((prev) => [...prev, { role: "user", content: text }]);
    setText("");

    // AI Response
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
      <Sidebar />
      <Container disableFooter>
        {/* <Button
          text={"Bot me"}
          className={"absolute top-1/2 right-1/2"}
          onClick={() =>
            setChat((prev) => [
              ...prev,
              { role: "model", content: "I am a bot" },
            ])
          }
        /> */}
        <main>
          {/* Chat Interface */}
          <section className="h-full space-y-2 px-2 py-4">
            {/* Chat Messages */}
            <div className="mini-scrollbar mx-auto flex h-[75vh] flex-col-reverse gap-3 overflow-y-auto scroll-smooth py-4 lg:w-[85%]">
              {chat && chat.length === 0 && (
                <p className="m-auto self-center text-2xl">
                  What's in your mind?
                </p>
              )}
              {[...chat].reverse().map((msg, idx) => (
                <Bubble key={idx} role={msg.role} content={msg.content} />
              ))}
            </div>

            <form onSubmit={sendMessage} className="mt-4">
              {/* Chat Input */}
              <div className="ring-primary shadow-primary space-y-1.5 self-end rounded-lg p-1.5 shadow-sm focus-within:shadow-md focus-within:ring-2 lg:mx-auto lg:w-[80%]">
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
              </div>
            </form>
          </section>
        </main>
      </Container>
    </div>
  );
};

export default Chatbot;
