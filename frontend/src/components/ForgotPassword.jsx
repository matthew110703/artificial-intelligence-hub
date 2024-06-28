/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Button, TextField } from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { getUser, forgotPasswordReset } from "../../utils/lib";

export default function ForgotPassword({ isOpen, onClose }) {
  if (!isOpen) return null;

  //   USER VERIFICATION
  const [email, setEmail] = useState("");
  const [userIsVerified, setUserIsVerified] = useState(false);
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  //  PASSWORD RESET
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await getUser(null, email);
      setUser(user);
      setUserIsVerified(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      // Reset password
      const res = await forgotPasswordReset(user.username, newPassword);
      setIsLoading(false);
      alert(res.success);
      onClose();
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg relative border-primary border-8">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline size={32} />
        </button>
        <p className="text-2xl font-semibold my-3">
          {userIsVerified ? "Reset Password" : "Forgot Password"}
        </p>
        {userIsVerified ? (
          <form onSubmit={handlePasswordReset}>
            <div className="flex flex-col gap-y-5">
              <TextField
                label="New Password"
                type="password"
                size="small"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirm New Password"
                type="password"
                size="small"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Reset
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-5">
              <TextField
                label="Enter your E-mail"
                type="email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Verify
              </Button>
            </div>
          </form>
        )}
        {isLoading && (
          <TbFidgetSpinner size={32} className=" animate-spin mx-auto gap-0" />
        )}
      </div>
    </div>
  );
}
