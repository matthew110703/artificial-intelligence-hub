// UI
import Icon from "./Icon";

// Icons
import { botSecondary } from "../../assets";

// Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // For syntax highlighting

const Bubble = ({ role, content }) => {
  // User Message Bubble
  if (role === "user") {
    return (
      <div className="bg-primary/25 max-w-[75%] self-end rounded-3xl px-4 py-2">
        {content}
      </div>
    );
  }

  // AI Response Container
  if (role === "model") {
    return (
      <div className="flex max-w-full items-start gap-2 self-start rounded-lg py-2 shadow-inner lg:px-2">
        <Icon
          src={botSecondary}
          size={24}
          invert
          className={"hidden md:block"}
        />
        <div className="max-w-[85%] px-2">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
};

export default Bubble;
