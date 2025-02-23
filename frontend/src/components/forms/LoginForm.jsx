import { useState } from "react";
import { Link } from "react-router-dom";

// UI
import Button from "../ui/Button";
import Input from "../ui/Input";

// Icons
import {
  username as userIcon,
  password as passwordIcon,
  visibility,
  visibilityOff,
  login,
} from "../../assets";

const LoginForm = () => {
  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Helper states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-primary/15 flex flex-col items-center justify-center gap-4 rounded-lg p-4 md:p-8 lg:shadow-inner"
      >
        <h2 className="font-primary mb-2 text-2xl font-bold md:text-4xl">
          Login
        </h2>

        {/* Username or Email */}
        <Input
          name={"user"}
          type="text"
          placeholder={"Username or Email"}
          startAdornment={userIcon}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={20}
        />
        {/* Password */}
        <Input
          name={"password"}
          type={showPassword ? "text" : "password"}
          placeholder={"Password"}
          startAdornment={passwordIcon}
          endAdornment={showPassword ? visibility : visibilityOff}
          onEndAdornmentClick={() => setShowPassword((prev) => !prev)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          maxLength={20}
          endAdornmentDescription={"Show/Hide Password"}
        />
        {/* Forgot Password */}
        <Link
          to="/forgot-password"
          className="text-dark dark:text-primary self-end text-sm font-semibold underline"
        >
          Forgot Password?
        </Link>
        {/* Login Button */}
        <div className="mt-4 space-y-1">
          <Button
            type="submit"
            text={"Login"}
            startIcon={login}
            className={"min-w-sm"}
          />
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-dark dark:text-primary font-semibold underline"
            >
              Signup
            </Link>
          </p>
        </div>

        {/* OR (Divider) */}
        <div className="my-2 flex w-full items-center gap-1.5">
          <svg className="stroke-dark dark:stroke-light w-full" height={"1"}>
            <line x2={"100%"} strokeWidth={"1"} />
          </svg>
          OR
          <svg className="stroke-dark dark:stroke-light w-full" height={"1"}>
            <line x2={"100%"} strokeWidth={"1"} />
          </svg>
        </div>

        {/* Login as a Guest Button */}
        <Button
          text={"Login as a Guest"}
          startIcon={login}
          className={"min-w-sm"}
        />
      </form>
    </section>
  );
};

export default LoginForm;
