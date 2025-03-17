import Icon from "./Icon";

// Animation
import { motion } from "motion/react";
import { buttonAnimation } from "../../lib/motion";

const Button = ({
  id,
  type = "button",
  text,
  startIcon,
  endIcon,
  loading = false,
  disabled = loading || false,
  className,
  onClick,
  iconSize = 24,
  hidden = false,
  ...rest
}) => {
  return (
    <motion.button
      variants={buttonAnimation}
      initial="initial"
      whileInView={"animate"}
      whileHover="hover"
      whileTap="tap"
      id={id || text}
      name={text}
      type={type}
      disabled={disabled}
      className={`${className} bg-primary font-primary text-dark flex items-end justify-center gap-x-2 rounded-3xl px-4 py-2 text-sm font-semibold shadow-2xl ${disabled && "cursor-not-allowed opacity-70"}`}
      onClick={onClick}
      aria-label={text}
      hidden={hidden || text === ""}
      {...rest}
    >
      {!loading && startIcon && (
        <Icon src={startIcon} alt={"icon"} size={iconSize} />
      )}
      {loading && (
        <motion.span
          animate={{
            rotate: loading ? 360 : 0,
            borderTopWidth: [2, 4],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="border-dark h-4 w-4 self-center rounded-full border-t-2 border-r-2"
        ></motion.span>
      )}
      {text && loading ? "Loading..." : text}
      {endIcon && <Icon src={startIcon} alt={"icon"} size={iconSize} />}
    </motion.button>
  );
};

export default Button;
