import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  // so the year updates by itself
  const year = new Date().getFullYear();

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

      <p className="footer-copy">© {year} Explore Malaysia. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
