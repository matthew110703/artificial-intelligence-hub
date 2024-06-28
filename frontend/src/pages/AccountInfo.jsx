import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../utils/lib";
import ResetPassword from "../components/ResetPassword";

export default function AccountInfo() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    } else {
      setUsername(cookies.user.username);
      setEmail(cookies.user.email);
      setPassword(cookies.user.password);
      setFirstName(cookies.user.firstName);
      setLastName(cookies.user.lastName);
    }
  }, [cookies.user, navigate]);

  const handleSaveChanges = async () => {
    try {
      await updateUser(username, { firstName, lastName, email });
      setCookie("user", {
        ...cookies.user,
        firstName,
        lastName,
        email,
      });
      alert("User updated successfully");
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(username);
      setCookie("user", "", { path: "/", maxAge: 0 });
      alert("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 w-96 h-auto">
      {isResetPassword ? (
        <ResetPassword username={username} />
      ) : (
        <>
          <p className="text-2xl font-semibold">Account Info</p>
          <p className="text-xs ">
            Username <br />{" "}
            <span className=" text-xl font-semibold">{username}</span>
          </p>
          <div className="flex gap-x-2">
            <TextField
              value={firstName}
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              focused
            />
            <TextField
              value={lastName}
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              focused
            />
          </div>
          <TextField
            type="email"
            value={email}
            label="E-mail Address"
            focused
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={password}
            label="Password"
            type="text"
            size="small"
            helperText="(Password is encrypted and cannot be viewed.)"
            focused
            disabled
          />
          <Button fullWidth variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setIsResetPassword(true);
            }}
          >
            Change Password
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={() => setIsDeleteAccount(true)}
          >
            Delete account
          </Button>

          {/* DELETE ACCOUNT DIALOG */}
          <Dialog open={isDeleteAccount}>
            <DialogTitle>Delete your account</DialogTitle>
            <DialogContent>
              Are you sure you want to delete your account?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="warning"
                onClick={handleDeleteAccount}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsDeleteAccount(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
