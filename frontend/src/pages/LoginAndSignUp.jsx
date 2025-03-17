import { useLocation } from "react-router-dom";

// UI
import { Container, LoginForm, SignUpForm } from "../components";

const LoginAndSignUp = () => {
  const location = useLocation();

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
