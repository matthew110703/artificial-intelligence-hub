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
import { Loading } from "../components";

// Motion
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  ) : (
    <Loading />
  );
};

export default Protected;
