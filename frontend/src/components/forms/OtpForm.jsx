import { useEffect, useState } from "react";

// UI
import Button from "../ui/Button";
import Input from "../ui/Input";

// Icons
import { login, password } from "../../assets";

// Services
import { sendOtp } from "../../services/authService";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../store/toastSlice";

const OtpForm = ({ onSubmit, onCancel }) => {
  const [otpResendTimeout, setOtpResendTimeout] = useState(90);
  const [loading, setLoading] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state?.account?.account);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(e.target?.otp?.value);
    setLoading(false);
  };

  // Send OTP
  useEffect(() => {
    setLoading(true);
    sendOtp(email)
      .then((res) => {
        dispatch(
          showToast({
            message: res?.message || "OTP sent successfully",
            type: "success",
          }),
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showToast({
            message: error || "Something went wrong",
            type: "error",
          }),
        );
      })
      .finally(() => setLoading(false));
  }, [dispatch, email]);

  // OTP timeout
  useEffect(() => {
    if (otpResendTimeout > 0) {
      const timer = setTimeout(() => {
        setOtpResendTimeout((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [otpResendTimeout]);

  // Handle Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    const { success, message } = await sendOtp(email, true);
    if (!success) {
      return dispatch(showToast({ message, type: "error" }));
    }
    dispatch(showToast({ message, type: success ? "success" : "error" }));
    setLoading(false);
    setOtpResendTimeout(90);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-dark flex min-w-sm flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 md:min-w-md"
    >
      <h2 className="font-primary mb-2 text-xl font-bold md:text-2xl">
        OTP Verification
      </h2>
      <p className="max-w-sm text-center text-sm">
        Enter the OTP (One-Time Password) sent to your email - {email}
      </p>
      {/* OTP Input */}
      <Input
        name={"otp"}
        placeholder={"6-digit code"}
        startAdornment={password}
        required
        minLength={6}
        maxLength={6}
        autoFocus
      />
      <div className="flex w-full items-center justify-between text-xs">
        <p>Didn’t receive code? </p>
        <button
          aria-label="Resend OTP"
          type="button"
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
        text={"Verify OTP"}
        startIcon={login}
        className={"my-4 min-w-sm"}
        loading={loading}
      />

      {/* Go back  */}
      <a
        href="#"
        role="button"
        className="text-sm text-blue-500 underline"
        onClick={onCancel}
      >
        Go Back
      </a>
    </form>
  );
};

export default OtpForm;
