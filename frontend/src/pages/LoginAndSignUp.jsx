import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// UI
import { Container, LoginForm, SignUpForm } from "../components";

// Redux
import { useSelector } from "react-redux";

const LoginAndSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (location.pathname === "/login") {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

  if (location.pathname === "/signup") {
    return (
      <Container>
        <SignUpForm />
      </Container>
    );
  }

  return null;
};

export default LoginAndSignUp;
