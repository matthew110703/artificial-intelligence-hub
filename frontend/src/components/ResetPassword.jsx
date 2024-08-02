/* eslint-disable react/prop-types */
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { resetPassword } from "../../utils/lib";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({ username }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword(username, oldPassword, newPassword);
      alert("Password reset successfully. Please login again.", res);
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="text-2xl font-semibold mb-4">Reset Password</p>
        <div className="flex flex-col gap-y-8">
          <TextField
            value={oldPassword}
            label="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <TextField
            type="password"
            value={newPassword}
            label="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
