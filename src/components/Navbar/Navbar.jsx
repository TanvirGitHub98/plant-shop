import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, X, ChevronDown } from "lucide-react";
import {  use, useContext, useState } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
export default function Navbar() {
  const { user, logout } = use(AuthContext)
  const [open, setOpen] = useState(false),
    [drop, setDrop] = useState(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <span>
            <Leaf size={20} />
          </span>
          GreenNest
        </Link>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {[
            ["/", "Home"],
            ["/plants", "Plants"],
            ["/profile", "My Profile"],
          ].map(([h, l]) => (
            <NavLink key={h} to={h} onClick={() => setOpen(false)}>
              {l}
            </NavLink>
          ))}
          <div className="nav-auth">
            {user ? (
              <div className="user-menu">
                <button onClick={() => setDrop(!drop)} className="avatar-btn">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/100?img=12"}
                    alt={user.displayName || "User"}
                  />
                  <ChevronDown size={15} />
                </button>
                {drop && (
                  <div className="dropdown">
                    <strong>{user.displayName || "Plant Lover"}</strong>
                    <small>{user.email}</small>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link className="login-link" to="/login">
                  Login
                </Link>
                <Link className="nav-cta" to="/register">
                  Join GreenNest
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
