import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h1>404 – Page not found</h1>
      <p style={{ margin: "1rem 0 1.5rem" }}>Sorry, this page does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
