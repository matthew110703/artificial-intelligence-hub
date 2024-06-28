import NavLink from "./NavLink";
import { MdExplore } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../../../utils/MyProvider";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function MainHeader() {
  const { setModal } = useContext(MyContext);

  const [cookies, , removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();
  const logoutRef = useRef();

  useEffect(() => {
    if (cookies.user) {
      logoutRef.current.hidden = false;
    } else {
      logoutRef.current.hidden = true;
    }
  });

  const logout = () => {
    removeCookie("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header>
      <div className="m-5 p-5 bg-primary rounded-lg flex flex-row items-center gap-10 justify-between border-b-4 border-white">
        <Link to="/">
          <div className=" flex flex-row gap-5">
            <img
              src="/media/brain.png"
              alt="Logo"
              width={32}
              height={32}
              className=""
              loading="lazy"
            />
            <span className="text-2xl font-semibold">
              ArTiFiciaL InTelLigeNcE HuB
            </span>
          </div>
        </Link>

        <nav>
          <ul className="flex flex-row items-center gap-10 ">
            <NavLink href="/explore">
              EXPLORE <MdExplore size={20} />
            </NavLink>
            <NavLink
              href="/contact"
              onClick={() => setModal({ isOpen: true, type: "contact" })}
            >
              CONTACT <IoMail size={20} />
            </NavLink>
            <a
              href="/#help"
              className="text-md  flex gap-2 items-center rounded p-2 font-normal shadow tracking-wider hover:shadow-xl hover:font-semibold
      transition ease-out hover:-translate-y-1 hover:scale-110 hover:bg-accent-2 duration-150"
            >
              HELP <BiSolidHelpCircle size={20} />
            </a>

            <Link
              to="/account"
              onClick={() => {
                setModal({ isOpen: true, type: "account" });
              }}
            >
              <div className="p-1 rounded-lg hover:scale-105 transition duration-100 ease-out flex flex-col items-center text-center text-sm font-semibold hover:bg-accent-1 ">
                <img
                  width="24"
                  height="24"
                  src="/media/logo.gif"
                  alt="logo-2"
                />
                <span>Account</span>
              </div>
            </Link>
            <button
              className="text-white border-2 border-white rounded shadow-lg px-3 py-1 hover:bg-white hover:text-black "
              ref={logoutRef}
              hidden
              onClick={logout}
            >
              Logout
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
