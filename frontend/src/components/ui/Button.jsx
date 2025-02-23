import Icon from "./Icon";

const Button = ({
  id,
  type = "button",
  text,
  startIcon,
  endIcon,
  disabled = false,
  className,
  onClick,
  iconSize = 24,
  hidden = false,
  ...rest
}) => {
  return (
    <button
      id={id || text}
      name={text}
      type={type}
      disabled={disabled}
      className={`${className} bg-primary font-primary text-dark flex items-end justify-center gap-x-2 rounded-3xl px-4 py-2 text-sm font-semibold shadow-2xl transition-all duration-150 hover:scale-105 hover:brightness-110 active:scale-95`}
      onClick={onClick}
      aria-label={text}
      hidden={hidden || text === ""}
      {...rest}
    >
      {startIcon && <Icon src={startIcon} alt={"icon"} size={iconSize} />}
      {text && text}
      {endIcon && <Icon src={startIcon} alt={"icon"} size={iconSize} />}
    </button>
  );
};

export default Button;
