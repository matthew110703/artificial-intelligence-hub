import { useNavigate } from "react-router-dom";

const NavLink = ({
  text,
  to = "#",
  className,
  hidden = false,
  active = false,
  onClick,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <button
      role="button"
      hidden={hidden}
      className={`font-primary hover:bg-primary/15 line-clamp-1 w-full rounded-lg px-3 py-1 text-center text-sm leading-8 text-wrap text-ellipsis hover:shadow-md ${active ? "bg-primary/25" : ""} ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate(to);
        }
      }}
      {...rest}
    >
      {text && <span>{text}</span>}
    </button>
  );
};

export default NavLink;
