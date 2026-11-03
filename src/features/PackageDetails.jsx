import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import "./PackageDetails.css";

const API_URL = "/data/packages.json";

// FEATURE 4: Package details page, e.g. /packages/3
function PackageDetails() {
  // useParams() reads the :id part of the URL.
  // If the URL is /packages/3, then id = "3" (a STRING)
  const { id } = useParams();

  const [pkg, setPkg] = useState(null);       // the one package to show
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data, then find the package with the matching id.
  // [id] = run again if the id in the URL changes.
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server responded with status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        // parseInt turns "3" into 3, so it can match the number in the JSON
        const found = data.find((item) => item.id === parseInt(id));
        setPkg(found || null); // null if no package has this id
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load package:", err);
        setError("Sorry, we couldn't load this package. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  // Link back to the list (used in every state below)
  const backLink = (
    <Link to="/packages" className="back-link">
      ← Back to Packages
    </Link>
  );

  // ----- Loading -----
  if (loading) {
    return <StatusMessage type="loading" message="Loading package details..." />;
  }

  // ----- Error -----
  if (error) {
    return (
      <div>
        {backLink}
        <StatusMessage type="error" message={error} />
      </div>
    );
  }

  // ----- No package with this id (e.g. /packages/99) -----
  if (!pkg) {
    return (
      <div>
        {backLink}
        <StatusMessage
          type="empty"
          message="Sorry, we couldn't find that package. It may no longer be available."
        />
      </div>
    );
  }

  // ----- Package found -----
  return (
    <section className="details-page">
      {backLink}

      <article className="details-card">
        <span className="details-category">{pkg.category}</span>
        <h1>{pkg.destination}</h1>
        <p className="details-state">📍 {pkg.state}</p>

        <p className="details-description">{pkg.description}</p>

        <div className="details-info">
          <div>
            <span className="info-label">Duration</span>
            <span className="info-value">
              {pkg.durationDays} Days {pkg.durationNights} Nights
            </span>
          </div>
          <div>
            <span className="info-label">Price</span>
            <span className="info-value">
              RM {pkg.price.toLocaleString("en-MY")} / person
            </span>
          </div>
        </div>

        <h2>What's included</h2>
        <ul className="details-inclusions">
          {pkg.inclusions.map((item) => (
            <li key={item}>✔ {item}</li>
          ))}
        </ul>

        <Link to="/contact" className="btn btn-primary">
          Ask Us About This Trip
        </Link>
      </article>
    </section>
  );
}

export default PackageDetails;
