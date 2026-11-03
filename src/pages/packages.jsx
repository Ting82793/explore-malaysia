import { useState, useEffect } from "react";
import PageHeader from "../components/pageheader.jsx";
import PackageCard from "../components/packagecard.jsx";
import StatusMessage from "../components/statusmessage.jsx";
import PackageFilters from "../components/packagefilters.jsx";
import PackageDetails from "../components/packagedetails.jsx";
import "./packages.css";

// Mock API: a JSON file served from public/data/packages.json
const API_URL = "/data/packages.json";

function Packages() {
  // ----- State: API data -----
  const [packages, setPackages] = useState([]);   // the data from the API
  const [loading, setLoading] = useState(true);   // true while fetching
  const [error, setError] = useState(null);       // error message, or null
  const [reloadKey, setReloadKey] = useState(0);  // changes to re-fetch

  // ----- State: new features -----
  const [searchTerm, setSearchTerm] = useState("");             // Feature 1
  const [selectedCategory, setSelectedCategory] = useState("All"); // Feature 2
  const [sortBy, setSortBy] = useState("default");              // Feature 3
  const [selectedPackage, setSelectedPackage] = useState(null); // Feature 4

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

  // ----- Button handlers -----
  function handleRetry() {
    setLoading(true);
    setError(null);
    setReloadKey((prev) => prev + 1); // changing this re-runs useEffect
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
  }

  function closeDetails() {
    setSelectedPackage(null);
  }

  // ----- Category list for the dropdown -----
  // new Set() removes duplicates, so each category appears only once
  const categories = ["All", ...new Set(packages.map((pkg) => pkg.category))];

  // ----- Apply search, filter and sort -----
  // We never change the original `packages` array.
  // .filter() makes a NEW array, so it is safe to .sort() it.
  const searchText = searchTerm.trim().toLowerCase();

  const visiblePackages = packages
    .filter((pkg) => {
      // Feature 1: does the destination or state contain the search text?
      const matchesSearch =
        pkg.destination.toLowerCase().includes(searchText) ||
        pkg.state.toLowerCase().includes(searchText);

      // Feature 2: is it in the chosen category?
      const matchesCategory =
        selectedCategory === "All" || pkg.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Feature 3: a negative number puts a first, positive puts b first
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "duration-asc") return a.durationDays - b.durationDays;
      if (sortBy === "duration-desc") return b.durationDays - a.durationDays;
      return a.id - b.id; // "Recommended" = original order
    });

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
      <>
        <PackageFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

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
                destination={pkg.destination}
                state={pkg.state}
                category={pkg.category}
                durationDays={pkg.durationDays}
                durationNights={pkg.durationNights}
                price={pkg.price}
                description={pkg.description}
                onViewDetails={() => setSelectedPackage(pkg)}
              />
            ))}
          </div>
        )}
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

      {/* Feature 4: only show the pop-up when a package is selected */}
      {selectedPackage && (
        <PackageDetails pkg={selectedPackage} onClose={closeDetails} />
      )}
    </section>
  );
}

export default Packages;
