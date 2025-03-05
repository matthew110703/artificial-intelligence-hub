import { lazy } from "react";
// UI
import Icon from "./Icon";

// Icons
import { botSecondary } from "../../assets";

// Lazy loading ReactMarkdown and plugins
const ReactMarkdown = lazy(() => import("react-markdown"));
const remarkGfm = lazy(() => import("remark-gfm"));
const rehypeHighlight = lazy(() => import("rehype-highlight"));
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
      <div className="dark:border-primary/25 chat-bubble flex max-w-full items-start gap-2 self-start rounded-lg py-2 shadow-inner lg:px-2 dark:border">
        <Icon
          src={botSecondary}
          size={24}
          invert
          className={"hidden md:block"}
        />
        <div className="max-w-[85%] space-y-2 px-2">
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
