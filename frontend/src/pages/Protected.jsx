import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import { checkUser } from "../services/authService";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    let isMounted = true; // Prevents double execution in Strict Mode

    // Function to verify user
    const verifyUser = async () => {
      const isValidUser = await checkUser();
      if (isMounted) {
        if (isValidUser) {
          dispatch(login());
        } else {
          dispatch(logout());
          dispatch(
            showToast({ message: "Please login to continue", type: "error" }),
          );
          navigate("/login");
        }
      }
    };

    verifyUser();

    return () => {
      isMounted = false; // ✅ Cleanup function to prevent double execution
    };
  }, [dispatch, navigate]);

  return isAuthenticated ? (
    children
  ) : (
    <div className="font-primary flex h-screen flex-col items-center justify-center text-2xl font-bold">
      Loading ...
    </div>
  );
};

export default Protected;
