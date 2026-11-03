import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // for the mobile menu (open or close)
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/packages", label: "Packages" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Explore <span>Malaysia</span>
        </Link>

        {/* only shows on small screens */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {/* NavLink adds the "active" class to the current page link */}
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className="nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
