import { useState, useEffect, useContext } from "react";
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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toggleTheme } = useContext(ThemeContext);
  const [showDetails, setShowDetails] = useState(false);

  // Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Close the details when clicked outside
  useEffect(() => {
    const element = document.getElementById("account");
    const details = document.getElementById("detail");
    const closeDetails = (e) => {
      if (
        showDetails &&
        !element.contains(e.target) &&
        !details.contains(e.target)
      ) {
        setShowDetails(false);
      }
    };

    window.addEventListener("click", closeDetails);

    return () => {
      window.removeEventListener("click", closeDetails);
    };
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
    <header className="text-dark font-primary dark:text-light shadow-primary container mx-auto flex w-full items-center justify-between rounded-lg px-4 py-2 shadow-sm">
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
            tooltipContent={"Toggle Light Mode"}
            invert
          />
        </button>
        <button className="dark:hidden" onClick={toggleTheme}>
          <Icon
            src={darkMode}
            alt={"dark-mode"}
            tooltipContent={"Toggle Dark Mode"}
            invert
          />
        </button>

        {/* source Code */}
        <a role="button" href="">
          <Icon
            src={sourceCode}
            alt={"source-code"}
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
            text={"Username"}
            startIcon={account}
            onClick={() => setShowDetails(!showDetails)}
            hidden={!isAuthenticated}
          />
          {showDetails && (
            <div
              id="detail"
              className="bg-light dark:bg-dark dark:shadow-light absolute right-0 z-[9999] mt-2 flex min-w-48 flex-col gap-1 rounded-lg p-1 shadow"
            >
              <NavLink text={"Dashboard"} to="/dashboard" />
              <NavLink text={"Account"} />
              <Button
                text={"Logout"}
                className={"rounded-lg"}
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
