import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./lib/ThemeContext";
// Pages
import {
  Home,
  Dashboard,
  Chatbot,
  Vocalize,
  Imagen,
  Mailbot,
  LoginAndSignUp,
  NotFound,
  Protected,
} from "./pages";

// Redux
import { useSelector } from "react-redux";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const toastState = useSelector((state) => state.toast);

  useEffect(() => {
    if (toastState.message) {
      toast[toastState.type](toastState.message);
    }
  }, [toastState]);

  return (
    <Router>
      <ToastContainer autoClose={3000} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/signup" element={<LoginAndSignUp />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/chat" element={<Chatbot />} />
        <Route
          path="/vocalize"
          element={
            <Protected>
              <Vocalize />
            </Protected>
          }
        />
        <Route
          path="/imagen"
          element={
            <Protected>
              <Imagen />
            </Protected>
          }
        />
        <Route
          path="/mailbot"
          element={
            <Protected>
              <Mailbot />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
