import { Link, useLocation, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "../components/AuthForm/AuthForm.css";
const Login=()=> {
  const { login, googleLogin, resetPassword } = use(AuthContext);
  const [e, setE] = useState(""),
    [p, setP] = useState(""),
    [show, setShow] = useState(false),
    [err, setErr] = useState(""),
    [toast, setToast] = useState("");
  const nav = useNavigate(),
    loc = useLocation(),
    go = () => nav(loc.state?.from || "/", { replace: true });
  const submit = async (x) => {
    x.preventDefault();
    try {
      setErr("");
      await login(e, p);
      go();
    } catch {
      setErr("Email or password is incorrect.");
    }
  };
  const google = async () => {
    try {
      await googleLogin();
      go();
    } catch {
      setErr("Google sign-in could not be completed.");
    }
  };
  const reset = async () => {
    if (!e) return setErr("Enter your email first.");
    try {
      await resetPassword(e);
      setToast("Reset email sent. Please check Gmail.");
      setTimeout(() => setToast(""), 3500);
      window.open("https://mail.google.com", "_blank");
    } catch {
      setErr("Could not send reset email.");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <h2>Your green corner is waiting.</h2>
      </div>
      <div className="auth-panel">
        <div className="auth-box">
          <span className="eyebrow">Welcome back</span>
          <h1>Login</h1>
          <p className="auth-sub">Continue caring for your indoor garden.</p>
          {err && <div className="error">{err}</div>}
          <form onSubmit={submit}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={e}
                onChange={(x) => setE(x.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={p}
                  onChange={(x) => setP(x.target.value)}
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="button" className="forgot" onClick={reset}>
              Forgot Password?
            </button>
            <button className="btn btn-primary auth-submit">Login</button>
          </form>
          <div className="divider">OR</div>
          <button className="google-btn" onClick={google}>
            G &nbsp; Continue with Google
          </button>
          <p className="switch">
            New to GreenNest? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Login;
