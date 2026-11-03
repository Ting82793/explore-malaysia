import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PackageCard from "../components/PackageCard";
import StatusMessage from "../components/StatusMessage";
import "./Packages.css";

// ----- New features (all in the src/features folder) -----
import SearchBar from "../features/SearchBar";            // Feature 1
import CategoryFilter from "../features/CategoryFilter";  // Feature 2
import SortMenu from "../features/SortMenu";              // Feature 3
import {
  searchPackages,
  filterByCategory,
  getCategories,
  sortPackages,
} from "../features/featureLogic";
// Feature 4 (details page) is connected in App.jsx and PackageCard.jsx

// Mock API: a local JSON file in public/data/packages.json
const API_URL = "/data/packages.json";

function Packages() {
  // ----- State: API data -----
  const [packages, setPackages] = useState([]);   // starts as an empty list
  const [loading, setLoading] = useState(true);   // true while fetching
  const [error, setError] = useState(null);       // error message, or null
  const [reloadKey, setReloadKey] = useState(0);  // change it to fetch again

  // ----- State: new features -----
  const [searchTerm, setSearchTerm] = useState("");                 // Feature 1
  const [selectedCategory, setSelectedCategory] = useState("All");  // Feature 2
  const [sortBy, setSortBy] = useState("default");                  // Feature 3

  // ----- Fetch data from the API -----
  // Runs once when the page loads, and again whenever reloadKey changes
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        // fetch() does not treat 404 as an error, so we check it ourselves
        if (!res.ok) {
          throw new Error("Server responded with status " + res.status);
        }
        return res.json(); // convert the response into JavaScript data
      })
      .then((data) => {
        // Make sure the API gave us a list
        if (!Array.isArray(data)) {
          throw new Error("API did not return a list of packages");
        }
        setPackages(data); // store the data in state
        setLoading(false);
      })
      .catch((err) => {
        // Runs if ANYTHING above fails
        console.error("Failed to load packages:", err);
        setError("Sorry, we couldn't load the travel packages. Please try again.");
        setLoading(false);
      });
  }, [reloadKey]);

  // ----- Button handlers -----
  function handleRetry() {
    setLoading(true);
    setError(null);
    setReloadKey(reloadKey + 1); // changing this runs useEffect again
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
  }

  // ----- Apply the features, one step at a time -----
  const categories = getCategories(packages);                         // for the dropdown
  const searched = searchPackages(packages, searchTerm);               // Feature 1
  const filtered = filterByCategory(searched, selectedCategory);       // Feature 2
  const visiblePackages = sortPackages(filtered, sortBy);              // Feature 3

  // ----- Decide what to show -----
  let content;

  if (loading) {
    content = <StatusMessage type="loading" message="Loading travel packages..." />;
  } else if (error) {
    content = <StatusMessage type="error" message={error} onRetry={handleRetry} />;
  } else if (packages.length === 0) {
    // The API itself returned nothing
    content = (
      <StatusMessage
        type="empty"
        message="No travel packages are available right now. Please check back soon."
      />
    );
  } else {
    content = (
      <div>
        {/* Toolbar with the new features */}
        <div className="package-filters">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryFilter
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <SortMenu value={sortBy} onChange={setSortBy} />
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        <p className="package-count" aria-live="polite">
          Showing {visiblePackages.length} of {packages.length} packages
        </p>

        {visiblePackages.length === 0 ? (
          // There IS data, but nothing matches the search/filter
          <StatusMessage
            type="empty"
            message="No packages match your search. Try a different keyword or category."
            onRetry={handleReset}
            buttonLabel="Clear Filters"
          />
        ) : (
          <div className="package-grid">
            {visiblePackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
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
        )}
      </div>
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
