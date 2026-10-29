import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Explore Malaysia</h3>
          <p>Discover Malaysia, Create Memories.</p>
        </div>

        <div className="footer-links">
          <Link to="/packages">Packages</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <p className="footer-copy">
        © {currentYear} Explore Malaysia. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;