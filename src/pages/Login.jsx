import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import "../components/AuthForm/AuthForm.css";

const Login = () => {
  const {
    signIn,
    googleSignIn,
    resetPassword,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToDesiredRoute = () => {
    const destination =
      location.state?.from || "/";

    navigate(destination, {
      replace: true,
    });
  };

  const handleLogin = async (
    event,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await signIn(
        email,
        password,
      );

      navigateToDesiredRoute();
    } catch (error) {
      console.error(
        "Login error:",
        error.code,
        error.message,
      );

      if (
        error.code ===
          "auth/invalid-credential" ||
        error.code ===
          "auth/wrong-password" ||
        error.code ===
          "auth/user-not-found"
      ) {
        setErrorMessage(
          "Email or password is incorrect.",
        );
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        setErrorMessage(
          "Please enter a valid email address.",
        );
      } else if (
        error.code ===
        "auth/too-many-requests"
      ) {
        setErrorMessage(
          "Too many failed attempts. Please try again later.",
        );
      } else if (
        error.code ===
        "auth/network-request-failed"
      ) {
        setErrorMessage(
          "Network error. Please check your internet connection.",
        );
      } else {
        setErrorMessage(
          "Login failed. Please try again.",
        );
      }

      setLoading(false);
    }
  };

  const handleGoogleSignIn =
    async () => {
      setErrorMessage("");
      setSuccessMessage("");

      try {
        await googleSignIn();

        navigateToDesiredRoute();
      } catch (error) {
        console.error(
          "Google sign-in error:",
          error.code,
          error.message,
        );

        if (
          error.code ===
          "auth/popup-closed-by-user"
        ) {
          setErrorMessage(
            "Google sign-in was cancelled.",
          );
        } else if (
          error.code ===
          "auth/popup-blocked"
        ) {
          setErrorMessage(
            "Google popup was blocked by the browser.",
          );
        } else if (
          error.code ===
          "auth/network-request-failed"
        ) {
          setErrorMessage(
            "Network error. Please check your internet connection.",
          );
        } else {
          setErrorMessage(
            "Google sign-in could not be completed.",
          );
        }

        setLoading(false);
      }
    };

  const handleForgotPassword =
    async () => {
      setErrorMessage("");
      setSuccessMessage("");

      if (!email) {
        setErrorMessage(
          "Enter your email address first.",
        );

        return;
      }

      try {
        await resetPassword(email);

        setSuccessMessage(
          "Password reset email sent. Please check Gmail.",
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 3500);

        window.open(
          "https://mail.google.com",
          "_blank",
          "noopener,noreferrer",
        );
      } catch (error) {
        console.error(
          "Password reset error:",
          error.code,
          error.message,
        );

        if (
          error.code ===
          "auth/invalid-email"
        ) {
          setErrorMessage(
            "Please enter a valid email address.",
          );
        } else if (
          error.code ===
          "auth/user-not-found"
        ) {
          setErrorMessage(
            "No account was found with this email.",
          );
        } else if (
          error.code ===
          "auth/network-request-failed"
        ) {
          setErrorMessage(
            "Network error. Please check your internet connection.",
          );
        } else {
          setErrorMessage(
            "Could not send the password reset email.",
          );
        }
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <h2>
          Your green corner is waiting.
        </h2>
      </div>

      <div className="auth-panel">
        <div className="auth-box">
          <span className="eyebrow">
            Welcome back
          </span>

          <h1>Login</h1>

          <p className="auth-sub">
            Continue caring for your
            indoor garden.
          </p>

          {errorMessage && (
            <div className="error">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                placeholder="you@example.com"
                autoComplete="email"
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="field">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrap">
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  value={password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                />

                <button
                  type="button"
                  className="toggle"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      !showPassword,
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="forgot"
              onClick={
                handleForgotPassword
              }
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <div className="divider">
            OR
          </div>

          <button
            type="button"
            className="google-btn"
            disabled={loading}
            onClick={
              handleGoogleSignIn
            }
          >
            G &nbsp; Continue with Google
          </button>

          <p className="switch">
            New to GreenNest?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="toast">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Login;