import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/signIn");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl text-slate-800 font-bold "
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          TaskMate
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <HashLink smooth to="/#hero" className="nav-link" onClick={closeMenu}>
            Home
          </HashLink>
          <HashLink
            smooth
            to="/#categories"
            className="nav-link"
            onClick={closeMenu}
          >
            Categories
          </HashLink>
          <HashLink
            smooth
            to="/#how-it-works"
            className="nav-link"
            onClick={closeMenu}
          >
            How It Works
          </HashLink>
          <Link to="/services" className="nav-link">
            Services
          </Link>

          {user?.role === "client" && (
            <NavLink to="/clients" className="nav-link" onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}
          {user?.role === "partner" && (
            <NavLink to="/partners" className="nav-link" onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="nav-button"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="nav-button-primary"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-600">
                Welcome, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="nav-button-primary bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
        {user && (
          <a href="/profile" className="text-sm text-slate-100">
            Profile
          </a>
        )}
        <button
          className="md:hidden text-slate-700 text-2xl"
          onClick={toggleMenu}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-sm">
          <div className="mobile-menu">
            <HashLink
              smooth
              to="/#hero"
              className="mobile-link "
              onClick={closeMenu}
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#categories"
              className="mobile-link"
              onClick={closeMenu}
            >
              Categories
            </HashLink>
            <HashLink
              smooth
              to="/#how-it-works"
              className="mobile-link"
              onClick={closeMenu}
            >
              How It Works
            </HashLink>

            {user?.role === "client" && (
              <NavLink
                to="/client-dashboard"
                className="mobile-link"
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}
            {user?.role === "partner" && (
              <NavLink
                to="/partner-dashboard"
                className="mobile-link"
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}

            {!user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/signin");
                    closeMenu();
                  }}
                  className="mobile-button"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    closeMenu();
                  }}
                  className="mobile-button-primary"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="mobile-button-primary bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
