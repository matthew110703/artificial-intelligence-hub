import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, Suspense, lazy } from "react";
import { ThemeContext } from "./lib/ThemeContext";

// Pages
import { Home, LoginAndSignUp, NotFound, Protected } from "./pages";

// UI
import { Loading } from "./components";

// Redux
import { useSelector } from "react-redux";

// Toast
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

// Lazy loading
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const Vocalize = lazy(() => import("./pages/Vocalize"));
const Imagen = lazy(() => import("./pages/Imagen"));
const Mailbot = lazy(() => import("./pages/Mailbot"));
const AccountForm = lazy(() => import("./components/forms/AccountForm"));

const App = () => {
  const { theme } = useContext(ThemeContext);
  const toastState = useSelector((state) => state.toast);
  const { showModal } = useSelector((state) => state.account);

  useEffect(() => {
    if (toastState.message) {
      toast[toastState.type](toastState.message);
    }
  }, [toastState]);

  return (
    <Router>
      <ToastContainer autoClose={3000} theme={theme} />
      {showModal && (
        <Suspense fallback={<Loading />}>
          <AccountForm />
        </Suspense>
      )}
      <Suspense fallback={<Loading />}>
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
          <Route
            path="/chat"
            element={
              <Protected>
                <Chatbot />
              </Protected>
            }
          />
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
      </Suspense>
    </Router>
  );
};

export default App;
