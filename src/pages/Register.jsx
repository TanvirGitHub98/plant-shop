import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import "../components/AuthForm/AuthForm.css";

const Register = () => {
  const {
    createUser,
    googleSignIn,
    updateUserProfile,
    setUser,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [photoURL, setPhotoURL] =
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

  const navigate = useNavigate();

  const validatePassword = () => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return "";
  };

  const handleRegister = async (
    event,
  ) => {
    event.preventDefault();

    setErrorMessage("");

    const passwordValidationError =
      validatePassword();

    if (passwordValidationError) {
      setErrorMessage(
        passwordValidationError,
      );

      return;
    }

    try {
      const userCredential =
        await createUser(
          email,
          password,
        );

      await updateUserProfile(
        name,
        photoURL,
      );

      setUser({
        ...userCredential.user,
        displayName: name,
        photoURL: photoURL,
      });

      navigate("/");
    } catch (error) {
      console.error(
        "Registration error:",
        error.code,
        error.message,
      );

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        setErrorMessage(
          "This email address is already registered.",
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
        "auth/weak-password"
      ) {
        setErrorMessage(
          "Please enter a stronger password.",
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
          "Registration failed. Please try again.",
        );
      }

      setLoading(false);
    }
  };

  const handleGoogleSignIn =
    async () => {
      setErrorMessage("");

      try {
        await googleSignIn();

        navigate("/");
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

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <h2>
          Begin your greener, calmer
          home.
        </h2>
      </div>

      <div className="auth-panel">
        <div className="auth-box">
          <span className="eyebrow">
            Join our community
          </span>

          <h1>Sign up</h1>

          <p className="auth-sub">
            Create your GreenNest
            account.
          </p>

          {errorMessage && (
            <div className="error">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleRegister}
          >
            <div className="field">
              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                required
                value={name}
                placeholder="Enter your full name"
                onChange={(event) =>
                  setName(
                    event.target.value,
                  )
                }
              />
            </div>

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
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="field">
              <label htmlFor="photoURL">
                Photo URL
              </label>

              <input
                id="photoURL"
                type="url"
                required
                value={photoURL}
                placeholder="https://example.com/photo.jpg"
                onChange={(event) =>
                  setPhotoURL(
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
                  placeholder="Minimum 6 characters"
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
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
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
            Already registered?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;