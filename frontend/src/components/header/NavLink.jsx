/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function NavLink({ children, href, onClick = () => {} }) {
  return (
    <>
      <Link to={href} className="text-md" onClick={onClick}>
        <li
          className="text-md  flex gap-2 items-center rounded p-2 font-normal shadow tracking-wider hover:shadow-xl hover:font-semibold
      transition ease-out hover:-translate-y-1 hover:scale-110 hover:bg-accent-2 duration-150"
        >
          {children}
        </li>
      </Link>
    </>
  );
}
