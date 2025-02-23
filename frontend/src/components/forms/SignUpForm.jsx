import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

// UI
import Input from "../ui/Input";
import Button from "../ui/Button";
import PurposeCard from "../ui/Cards/PurposeCard";

// Icons
import {
  username,
  email,
  password,
  login,
  visibility,
  visibilityOff,
} from "../../assets";

// Constants
import { PURPOSES } from "../../lib/constants";

const SignUpForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    purpose: "",
  });

  // Toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otpResendTimeout, setOtpResendTimeout] = useState(90);

  // Handle Change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate Form
  const validateForm = (e) => {
    e.preventDefault();

    // Validate fields
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (form.purpose === "") {
      alert("Please select a purpose of use");
      return;
    }

    // Check username & email availability

    // Send OTP to email

    // Set isSubmitted to true
    setIsSubmitted(true);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log(form);
  };

  // OTP timeout
  useEffect(() => {
    if (otpResendTimeout > 0 && isSubmitted) {
      const timer = setTimeout(() => {
        setOtpResendTimeout((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, otpResendTimeout]);

  const handleResendOTP = () => {
    setOtpResendTimeout(90);
    alert("OTP Resent to your email");
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center">
      {/* Sign Up Form */}
      {!isSubmitted && (
        <form
          onSubmit={validateForm}
          className="dark:bg-primary/15 flex flex-col items-center justify-center gap-4 rounded-lg p-4 md:p-8 lg:shadow-inner"
        >
          <h2 className="font-primary mb-2 text-2xl font-bold md:text-4xl">
            Sign Up
          </h2>
          {/* First Name & Last Name */}
          <div className="flex w-full gap-2">
            <Input
              name="firstname"
              type="text"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={20}
            />
            <Input
              name={"lastname"}
              type="text"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={20}
            />
          </div>
          {/* Username */}
          <Input
            name={"username"}
            type="text"
            placeholder={"Username"}
            startAdornment={username}
            value={form.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={20}
          />
          {/* Email */}
          <Input
            name={"email"}
            type="email"
            placeholder={"Email Address"}
            startAdornment={email}
            value={form.email}
            onChange={handleChange}
            required
          />
          {/* Password & Confirm Password */}
          <Input
            name={"password"}
            type={showPassword ? "text" : "password"}
            placeholder={"Password"}
            startAdornment={password}
            endAdornment={showPassword ? visibility : visibilityOff}
            onEndAdornmentClick={() => setShowPassword((prev) => !prev)}
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
            endAdornmentDescription={"Show/Hide Password"}
          />
          <Input
            name={"confirmPassword"}
            type={showPassword ? "text" : "password"}
            placeholder={"Confirm Password"}
            startAdornment={password}
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
          />
          {/* Purpose */}
          <div className="my-4 flex w-full justify-center gap-8">
            {PURPOSES.map((purpose) => (
              <PurposeCard
                key={purpose.title}
                title={purpose.title}
                icon={purpose.icon}
                value={form.purpose}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    purpose: purpose.title,
                  }))
                }
              />
            ))}
          </div>

          {/* Sign Up Button */}
          <div>
            <Button
              type="submit"
              text={"Sign Up"}
              startIcon={login}
              className={"min-w-sm"}
            />
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-dark dark:text-primary font-semibold underline"
              >
                Login
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
      )}

      {/* OTP Verification Form */}
      {isSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4"
        >
          <h2 className="font-primary mb-2 text-2xl font-bold md:text-4xl">
            OTP Verification
          </h2>
          <p className="max-w-sm text-center text-sm">
            Enter the OTP (One-Time Password) sent to your email - {form.email}
          </p>
          {/* OTP Input */}
          <Input
            name={"otp"}
            placeholder={"6-digit code"}
            startAdornment={password}
            value={form.otp}
            onChange={handleChange}
            required
            minLength={6}
            maxLength={6}
            autoFocus
          />
          <div className="flex w-full items-center justify-between text-xs">
            <p>Didn’t receive code? </p>
            <button
              className="bg-primary/50 rounded-full px-2 py-1 text-xs disabled:bg-gray-200"
              disabled={otpResendTimeout > 0}
              onClick={handleResendOTP}
            >
              {otpResendTimeout > 0
                ? `Resend in ${otpResendTimeout}s`
                : "Resend OTP"}
            </button>
          </div>
          <Button
            type="submit"
            text={"Verify"}
            startIcon={login}
            className={"my-4 min-w-sm"}
          />

          {/* Go back  */}
          <a
            href="#"
            role="button"
            className="text-sm text-blue-500 underline"
            onClick={() => setIsSubmitted(false)}
          >
            Go Back
          </a>
        </form>
      )}
    </section>
  );
};

export default SignUpForm;
