import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "../components/AuthForm/AuthForm.css";
export default function Register() {
  const { register, googleLogin } = use(AuthContext);
  const [n, setN] = useState(""),
    [e, setE] = useState(""),
    [photo, setPhoto] = useState(""),
    [p, setP] = useState(""),
    [show, setShow] = useState(false),
    [err, setErr] = useState("");
  const nav = useNavigate();
  const valid = () =>
    p.length < 6
      ? "Password must be at least 6 characters."
      : !/[A-Z]/.test(p)
        ? "Password must contain an uppercase letter."
        : !/[a-z]/.test(p)
          ? "Password must contain a lowercase letter."
          : "";
  const submit = async (x) => {
    x.preventDefault();
    const m = valid();
    if (m) return setErr(m);
    try {
      await register(n, e, p, photo);
      nav("/");
    } catch {
      setErr("Registration failed. This email may already be in use.");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <h2>Begin your greener, calmer home.</h2>
      </div>
      <div className="auth-panel">
        <div className="auth-box">
          <span className="eyebrow">Join our community</span>
          <h1>Sign up</h1>
          {err && <div className="error">{err}</div>}
          <form onSubmit={submit}>
            <div className="field">
              <label>Name</label>
              <input
                required
                value={n}
                onChange={(x) => setN(x.target.value)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={e}
                onChange={(x) => setE(x.target.value)}
              />
            </div>
            <div className="field">
              <label>Photo URL</label>
              <input
                type="url"
                required
                value={photo}
                onChange={(x) => setPhoto(x.target.value)}
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
            <button className="btn btn-primary auth-submit">
              Create account
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            className="google-btn"
            onClick={async () => {
              await googleLogin();
              nav("/");
            }}
          >
            G &nbsp; Continue with Google
          </button>
          <p className="switch">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
