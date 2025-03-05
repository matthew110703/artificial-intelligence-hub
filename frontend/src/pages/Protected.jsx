import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, logout, loginAsGuest } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import { setAccount } from "../store/accountSlice";

// Services
import { checkUser } from "../services/authService";
import { getUser } from "../services/userService";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, isGuest } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true; // Prevents double execution in Strict Mode

    // Function to verify user
    const verifyUser = async () => {
      try {
        const isValidUser = await checkUser();
        if (isMounted) {
          if (isValidUser) {
            const res = await getUser();
            dispatch(setAccount(res?.user));
            dispatch(login(token));
          } else {
            if (location.pathname !== "/chat") {
              dispatch(logout());
              dispatch(
                showToast({
                  message: "Please login to continue",
                  type: "error",
                }),
              );
              navigate("/login");
            } else {
              dispatch(loginAsGuest());
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyUser();

    return () => {
      isMounted = false; // ✅ Cleanup function to prevent double execution
    };
  }, [dispatch, location.pathname, navigate, token]);

  return isAuthenticated | isGuest ? (
    children
  ) : (
    <div className="font-primary flex h-screen flex-col items-center justify-center text-2xl font-bold">
      Loading ...
    </div>
  );
};

export default Protected;
