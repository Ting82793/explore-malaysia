import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import "./PackageDetails.css";

// Feature 4 - details page for one package (e.g. /packages/3)
function PackageDetails() {
  // get the id from the url
  const { id } = useParams();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/packages.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load");
        }
        return res.json();
      })
      .then((data) => {
        // id from url is a string, so use parseInt to change it to a number
        const found = data.find((item) => item.id === parseInt(id));
        setPkg(found);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Sorry, we couldn't load this package. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <StatusMessage type="loading" message="Loading package details..." />;
  }

  if (error) {
    return (
      <div>
        <Link to="/packages" className="back-link">← Back to Packages</Link>
        <StatusMessage type="error" message={error} />
      </div>
    );
  }

  // no package with this id (e.g. /packages/99)
  if (!pkg) {
    return (
      <div>
        <Link to="/packages" className="back-link">← Back to Packages</Link>
        <StatusMessage type="empty" message="Sorry, this package can't be found." />
      </div>
    );
  }

  return (
    <section>
      <Link to="/packages" className="back-link">← Back to Packages</Link>

      <div className="details-card">
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
            <span className="info-value">RM {pkg.price.toLocaleString()} / person</span>
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
      </div>
    </section>
  );
}

export default PackageDetails;
