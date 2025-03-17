// UI
import Icon from "./Icon";

// Icons
import { botSecondary } from "../../assets";

// Lazy loading ReactMarkdown and plugins
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // For syntax highlighting

// Motion
import { motion } from "motion/react";
import { textAnimation } from "../../lib/motion";

const Bubble = ({ role, content }) => {
  // User Message Bubble
  if (role === "user") {
    return (
      <motion.div
        className="bg-primary/25 max-w-[75%] self-end rounded-3xl px-4 py-2"
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {content}
      </motion.div>
    );
  }

  // AI Response Container
  if (role === "model") {
    return (
      <motion.div
        className="dark:border-primary/25 chat-bubble flex max-w-full items-start gap-2 self-start rounded-lg py-2 shadow-inner lg:px-2 dark:border"
        variants={textAnimation}
        {...textAnimation}
      >
        <Icon
          src={botSecondary}
          size={24}
          invert
          className={"hidden md:block"}
        />
        <div className="max-w-[100%] space-y-2 px-2 lg:max-w-[90%]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
    );
  }
};

export default Bubble;
