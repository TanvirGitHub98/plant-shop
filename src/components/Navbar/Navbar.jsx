import {
  useContext,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Leaf,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const {
    user,
    logOut,
  } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [
    isDropdownOpen,
    setIsDropdownOpen,
  ] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();

      setIsDropdownOpen(false);
      setIsMenuOpen(false);

      navigate("/");
    } catch (error) {
      console.error(
        "Logout error:",
        error.code,
        error.message,
      );
    }
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const navigationLinks = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/plants",
      label: "Plants",
    },
    {
      path: "/profile",
      label: "My Profile",
    },
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link
          to="/"
          className="logo"
          onClick={handleNavigation}
        >
          <span>
            <Leaf size={20} />
          </span>

          GreenNest
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() =>
            setIsMenuOpen(
              !isMenuOpen,
            )
          }
        >
          {isMenuOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

        <nav
          className={
            isMenuOpen
              ? "nav-links open"
              : "nav-links"
          }
        >
          {navigationLinks.map(
            ({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={handleNavigation}
                className={({
                  isActive,
                }) =>
                  isActive
                    ? "active"
                    : ""
                }
              >
                {label}
              </NavLink>
            ),
          )}

          <div className="nav-auth">
            {user ? (
              <div className="user-menu">
                <button
                  type="button"
                  className="avatar-btn"
                  aria-label="Open user menu"
                  onClick={() =>
                    setIsDropdownOpen(
                      !isDropdownOpen,
                    )
                  }
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://i.pravatar.cc/100?img=12"
                    }
                    alt={
                      user.displayName ||
                      "User profile"
                    }
                  />

                  <ChevronDown
                    size={15}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="dropdown">
                    <strong>
                      {user.displayName ||
                        "Plant Lover"}
                    </strong>

                    <small>
                      {user.email}
                    </small>

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  className="login-link"
                  to="/login"
                  onClick={
                    handleNavigation
                  }
                >
                  Login
                </Link>

                <Link
                  className="nav-cta"
                  to="/register"
                  onClick={
                    handleNavigation
                  }
                >
                  Join GreenNest
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;