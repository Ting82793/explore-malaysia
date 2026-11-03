import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PackageCard from "../components/PackageCard";
import StatusMessage from "../components/StatusMessage";
import PackageFilters from "../components/PackageFilters";
import "./Packages.css";

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

  // ----- Category list for the dropdown -----
  // Add each category only once (skip ones already in the list)
  const categories = ["All"];
  packages.forEach((pkg) => {
    if (!categories.includes(pkg.category)) {
      categories.push(pkg.category);
    }
  });

  // ----- Apply search, filter and sort -----
  // The original `packages` list is never changed.
  // .filter() makes a NEW list, so it is safe to .sort() it.
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
      // Feature 3: negative number = a goes first, positive = b goes first
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
      <div>
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
