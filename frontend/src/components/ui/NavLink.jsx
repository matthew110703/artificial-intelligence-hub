import { Link } from "react-router-dom";

const NavLink = ({
  text,
  to = "#",
  className,
  hidden = false,
  active = false,
  ...rest
}) => {
  return (
    <Link
      role="button"
      to={to}
      hidden={hidden}
      className={`font-primary hover:bg-primary/15 w-full rounded-lg px-3 py-1.5 text-center text-sm hover:shadow-md ${active ? "bg-primary/25" : ""} ${className}`}
      {...rest}
    >
      {text && <span>{text}</span>}
    </Link>
  );
};

export default NavLink;
