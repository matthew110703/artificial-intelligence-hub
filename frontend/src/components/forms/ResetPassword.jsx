import { useState } from "react";

// UI
import Button from "../ui/Button";
import Input from "../ui/Input";
import Icon from "../ui/Icon";
import OtpForm from "./OtpForm";

// Icons
import {
  closeIcon,
  login,
  password,
  visibility,
  visibilityOff,
} from "../../assets";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "../../store/toastSlice";

// Services
import { resetPassword } from "../../services/authService";

const ResetPassword = ({ onCancel, email }) => {
  // Redux
  const dispatch = useDispatch();

  // Form
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [inVerification, setInVerification] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (form.newPassword !== form.confirmPassword) {
      return dispatch(
        showToast({
          message: "Passwords do not match",
          type: "error",
        }),
      );
    }
    setInVerification(true);
  };

  const handleResetPassword = async (otp) => {
    const payload = {
      otp,
      email,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    };

    // API Call
    try {
      const res = await resetPassword(payload);
      dispatch(
        showToast({
          message: res?.message || "Password reset successfully",
          type: "success",
        }),
      );
      setInVerification(false);
      onCancel();
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          message: error || "Something went wrong",
          type: "error",
        }),
      );
      if (error !== "Invalid OTP") {
        setInVerification(false);
      }
    } finally {
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  if (inVerification) {
    return (
      <OtpForm
        onSubmit={handleResetPassword}
        onCancel={() => setInVerification(false)}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-dark flex min-w-sm flex-col gap-2 rounded-lg bg-white p-4 md:min-w-md"
    >
      <header className="flex items-center justify-between">
        <h2 className="font-primary text-xl font-bold md:text-2xl">
          Reset Password
        </h2>
        <button type="button" onClick={onCancel}>
          <Icon src={closeIcon} alt={"Close"} size={24} invert />
        </button>
      </header>
      <main className="mt-4 flex flex-col gap-6">
        {/* Old Password */}
        <Input
          name={"oldPassword"}
          type={"password"}
          placeholder={"Old Password"}
          startAdornment={password}
          required
          value={form.oldPassword}
          onChange={handleChange}
          minLength={8}
          maxLength={20}
          autoFocus
        />

        {/* New Password */}
        <Input
          name={"newPassword"}
          type={showPassword ? "text" : "password"}
          placeholder={"New Password"}
          startAdornment={password}
          endAdornment={showPassword ? visibility : visibilityOff}
          endAdornmentDescription={
            showPassword ? "Hide Password" : "Show Password"
          }
          onEndAdornmentClick={() => setShowPassword((prev) => !prev)}
          required
          value={form.newPassword}
          onChange={handleChange}
          minLength={8}
          maxLength={20}
        />

        {/* Confirm Password */}
        <Input
          name={"confirmPassword"}
          type={showPassword ? "text" : "password"}
          placeholder={"Confirm Password"}
          startAdornment={password}
          required
          value={form.confirmPassword}
          onChange={handleChange}
          minLength={8}
          maxLength={20}
        />

        {/* Submit Button */}
        <Button
          id={"reset-password"}
          type="submit"
          text={"Reset Password"}
          startIcon={login}
          className={"my-4 min-w-sm"}
        />
      </main>
    </form>
  );
};

export default ResetPassword;
