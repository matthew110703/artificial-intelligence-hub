// UI
import Icon from "./Icon";

// Icons
import { botSecondary } from "../../assets";

const Bubble = ({ role, content }) => {
  // User Message Bubble
  if (role === "user") {
    return (
      <div className="bg-primary/25 max-w-[75%] self-end rounded-3xl px-3 py-1.5">
        {content}
      </div>
    );
  }

  // AI Response Container
  if (role === "model") {
    return (
      <div className="flex max-w-[90%] items-start gap-2 self-start py-2 lg:max-w-[75%]">
        <Icon src={botSecondary} size={24} invert />
        <div>{content}</div>
      </div>
    );
  }
};

export default Bubble;
