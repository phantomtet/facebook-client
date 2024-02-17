import LoginForm from "./components/loginForm";
import "./style.css";

export default function LogIn() {
  return (
    <div className="login-container">
      <title>Facebook - log in or sign up</title>
      <div className="description-container">
        <img className="img" src="facebook-logo.svg" />
        <div className="description">
          Facebook helps you connect and share with the people in your life.
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
