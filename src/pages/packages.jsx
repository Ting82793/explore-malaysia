import { useState, useEffect } from "react";
import PageHeader from "../components/pageheader.jsx";
import PackageCard from "../components/packagecard.jsx";
import StatusMessage from "../components/statusmessage.jsx";
import "./packages.css";

// Mock API: a JSON file served from public/data/packages.json
const API_URL = "/data/packages.json";

function Packages() {
  // ----- State -----
  const [packages, setPackages] = useState([]);   // the data from the API
  const [loading, setLoading] = useState(true);   // true while fetching
  const [error, setError] = useState(null);       // error message, or null
  const [reloadKey, setReloadKey] = useState(0);  // changes to re-fetch

  // ----- Fetch data from the API -----
  // Runs when the page first loads, and again whenever reloadKey changes
  useEffect(() => {
    // If the user leaves the page before the fetch finishes,
    // ignore becomes true so we don't update state on a closed page
    let ignore = false;

    async function loadPackages() {
      try {
        const response = await fetch(API_URL);

        // fetch() only fails on network errors, so check the HTTP status too
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        // Make sure the API gave us a list
        if (!Array.isArray(data)) {
          throw new Error("API did not return a list of packages");
        }

        if (!ignore) setPackages(data);
      } catch (err) {
        console.error("Failed to load packages:", err);
        if (!ignore) {
          setError("Sorry, we couldn't load the travel packages. Please try again.");
        }
      } finally {
        // Runs after success OR error
        if (!ignore) setLoading(false);
      }
    }

    loadPackages();

    // Cleanup function
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // ----- "Try Again" button -----
  function handleRetry() {
    setLoading(true);
    setError(null);
    setReloadKey((prev) => prev + 1); // changing this re-runs useEffect
  }

  // ----- Decide what to show -----
  let content;

  if (loading) {
    content = <StatusMessage type="loading" message="Loading travel packages..." />;
  } else if (error) {
    content = <StatusMessage type="error" message={error} onRetry={handleRetry} />;
  } else if (packages.length === 0) {
    content = (
      <StatusMessage
        type="empty"
        message="No travel packages are available right now. Please check back soon."
      />
    );
  } else {
    content = (
      <>
        <p className="package-count">Showing {packages.length} packages</p>

        <div className="package-grid">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              destination={pkg.destination}
              state={pkg.state}
              category={pkg.category}
              durationDays={pkg.durationDays}
              durationNights={pkg.durationNights}
              price={pkg.price}
              description={pkg.description}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <section className="packages-page">
      <PageHeader
        title="Travel Packages"
        subtitle="Handpicked trips to the best destinations across Malaysia."
      />
      {content}
    </section>
  );
}

export default Packages;
