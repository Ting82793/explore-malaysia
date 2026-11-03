import { Link } from "react-router-dom";

// Shown when the URL does not match any route (path="*")
function NotFound() {
  return (
    <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h1>404 – Page not found</h1>
      <p style={{ margin: "1rem 0 1.5rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
