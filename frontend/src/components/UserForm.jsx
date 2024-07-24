/* eslint-disable react/prop-types */

import { TextField } from "@mui/material";
import { FiArrowRightCircle } from "react-icons/fi";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, getUser } from "../../utils/lib";
import { useCookies } from "react-cookie";
import ForgotPassword from "./ForgotPassword";

export default function UserForm({ isLoginPage }) {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["user"]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleDynamicButton = () => {
    if (isLoginPage) {
      setPassword("");
      setEmail("");
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLoginPage) {
      // LOGIN USER
      try {
        const response = await signIn(email, password);
        const user = await getUser(response.username);
        setCookie("user", user, { path: "/", maxAge: 3600 });
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      }
    } else {
      // REGISTER USER
      if (password.length >= 8) {
        console.log(password.length);
        if (password === password2) {
          const credentials = {
            username: userName,
            email: email,
            password: password,
          };
          try {
            const response = await signUp(credentials);
            setIsLoading(false);
            alert(response.success);
            setEmail("");
            setPassword("");
            navigate("/login");
          } catch (error) {
            alert(error.message);
            setIsLoading(false);
          }
        } else {
          alert("Passwords do not match");
          setIsLoading(false);
        }
      } else {
        alert("Password must be at least 8 characters long");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-10 bg-primary   m-auto text-center shadow-xl rounded-md scale-110 ">
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 ">
          <div className="text-3xl mx-auto">
            <img src="/media/brain.png" alt="" />
          </div>

          {isLoginPage ? null : (
            <div className="flex  items-center justify-center">
              <img
                width="32"
                height="32"
                src="/media/bot.png"
                alt="username"
                className="mx-2"
              />
              <TextField
                variant="standard"
                label="Username"
                type="text"
                helperText="Only lowercase letters and numbers. No spaces."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                required
              />
            </div>
          )}

          {/* Email Input Field  */}
          <div className="flex  items-end">
            <img
              width="32"
              height="32"
              src="/media/bot.png"
              alt="bot"
              className="mx-2"
            />
            <TextField
              variant="standard"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </div>

          {/* Password Input Field  */}
          <div
            className={`flex ${isLoginPage ? "items-end" : "items-center"} `}
          >
            <img
              width="32"
              height="32"
              src="/media/bot-password.png"
              alt="password"
              className="mx-2"
            />
            <TextField
              variant="standard"
              label="Password"
              type="password"
              helperText={isLoginPage ? null : `At least 8 characters long.`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </div>

          {/* Confirm Password Input Field  */}
          {isLoginPage ? null : (
            <div className="flex  items-end">
              <img
                width="32"
                height="32"
                src="/media/bot-password.png"
                alt="password"
                className="mx-2"
              />
              <TextField
                variant="standard"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                fullWidth
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="m-auto my-6 bg-secondary  text-lg text-white p-2 rounded-md w-2/3 italic tracking-widest shadow ring-transition "
          >
            {isLoginPage ? "Login" : "Register"}
            <FiArrowRightCircle className="inline ml-2  my-auto" />
          </button>

          {isLoading && (
            <TbFidgetSpinner
              size={32}
              className=" animate-spin mx-auto gap-0"
            />
          )}
        </div>
      </form>

      <div className="flex flex-row  gap-40 justify-between mt-10">
        <a role="button" onClick={() => setIsForgotPasswordOpen(true)}>
          <div
            className={`${
              !isLoginPage && "invisible"
            } text-sm font-semibold  p-1 rounded-lg hover:bg-accent-1  shadow hover:shadow-xl  hover:scale-105 transition ease-out duration-150 `}
          >
            <img
              src="/media/bot-qmark.png"
              alt="bot-question-mark"
              width={32}
              height={32}
              className="mx-auto"
            />
            <span>Forgot Password?</span>
          </div>
        </a>

        <a role="button" onClick={handleDynamicButton}>
          <div className="text-sm font-semibold  p-1 rounded-lg hover:bg-accent-1 shadow hover:shadow-xl  hover:scale-105 transition ease-out duration-150 px-4">
            <img
              src="/media/bot-add.png"
              alt="bot-add"
              width={32}
              height={32}
              className="mx-auto"
            />
            <span>{isLoginPage ? "Sign Up" : "Sign In"}</span>
          </div>
        </a>
      </div>
    </div>
  );
}
