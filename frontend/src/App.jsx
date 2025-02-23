import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/signup" element={<LoginAndSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/vocalize" element={<Vocalize />} />
        <Route path="/imagen" element={<Imagen />} />
        <Route path="/mailbot" element={<Mailbot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
