import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../lib/ThemeContext";

import {
  logo,
  lightMode,
  darkMode,
  sourceCode,
  login,
  account,
} from "../../assets";
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";
import Icon from "../ui/Icon";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../store/toastSlice";
import { logout } from "../../store/authSlice";
import { toggleModal } from "../../store/accountSlice";

// Animation
import { AnimatePresence, motion } from "motion/react";
import { fadeInDown, dropdownAnim } from "../../lib/motion";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailsRef = useRef(null);

  const { toggleTheme } = useContext(ThemeContext);
  const [showDetails, setShowDetails] = useState(false);

  // Redux
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { username } = useSelector((state) => state.account?.account);

  // Close the details when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDetails]);

  const handleLogout = () => {
    // Logout User
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(
      showToast({
        message: "Logged out successfully",
        type: "success",
      }),
    );
    // Redirect to Home
    navigate("/");
  };

  return (
    <motion.header
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      viewport={{ once: true }}
      className="text-dark font-primary dark:text-light shadow-primary container mx-auto flex w-full items-center justify-between rounded-lg px-4 py-2 shadow-sm"
    >
      {/* Brand Logo */}
      <Link
        role="button"
        to={isAuthenticated ? "/dashboard" : "/"}
        className="flex items-end gap-2 text-lg font-bold md:text-xl"
      >
        <Icon src={logo} alt={"Logo"} size={32} invert />
        <span className="hidden md:block">ArTiFiciaL InTelLigeNcE HuB</span>
        <span className="block md:hidden">AI Hub</span>
      </Link>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle  */}
        <button className="hidden dark:inline" onClick={toggleTheme}>
          <Icon
            src={lightMode}
            alt={"light-mode"}
            tooltipId={"light-mode"}
            tooltipContent={"Toggle Light Mode"}
            invert
          />
        </button>
        <button className="dark:hidden" onClick={toggleTheme}>
          <Icon
            src={darkMode}
            alt={"dark-mode"}
            tooltipId={"dark-mode"}
            tooltipContent={"Toggle Dark Mode"}
            invert
          />
        </button>

        {/* source Code */}
        <a
          role="button"
          href="https://github.com/matthew110703"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            src={sourceCode}
            alt={"source-code"}
            tooltipId={"source-code"}
            tooltipContent={"Source Code"}
            invert
          />
        </a>

        {/* User Actions */}
        <Button
          text={"Login"}
          startIcon={login}
          onClick={() => navigate("/login")}
          hidden={isAuthenticated}
        />
        <div className="relative">
          <Button
            id={"account"}
            text={username || "Account"}
            startIcon={account}
            onClick={() => setShowDetails(!showDetails)}
            hidden={!isAuthenticated}
            className={"line-clamp-1 max-w-[200px] text-ellipsis"}
          />
          <AnimatePresence>
            {showDetails && (
              <motion.div
                ref={detailsRef}
                className="bg-light dark:bg-dark dark:shadow-light absolute right-0 z-[9999] mt-2 flex min-w-48 flex-col gap-1 rounded-lg p-1 shadow"
                variants={dropdownAnim}
                {...dropdownAnim}
              >
                <NavLink text={"Dashboard"} to="/dashboard" />
                <NavLink
                  text={"Account"}
                  onClick={() => {
                    dispatch(toggleModal());
                    setShowDetails(false);
                  }}
                />
                <Button
                  text={"Logout"}
                  className={"rounded-lg"}
                  onClick={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
