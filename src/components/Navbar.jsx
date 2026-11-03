import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // true = mobile menu is showing, false = hidden
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links stored as data, then shown with .map()
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
        {/* <Link> changes the URL without reloading the page */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Explore <span>Malaysia</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {links.map((link) => (
            // NavLink is a Link that automatically adds the class "active"
            // when its page is open, so CSS can highlight it
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
