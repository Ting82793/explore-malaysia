import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PackageCard from "../components/PackageCard";
import StatusMessage from "../components/StatusMessage";
import "./Packages.css";

// new features
import SearchBar from "../features/SearchBar";
import CategoryFilter from "../features/CategoryFilter";
import SortMenu from "../features/SortMenu";
import {
  searchPackages,
  filterByCategory,
  getCategories,
  sortPackages,
} from "../features/featureLogic";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

  // for the new features
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // get the packages from the json file (mock api)
  useEffect(() => {
    fetch("/data/packages.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load");
        }
        return res.json();
      })
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Sorry, we couldn't load the travel packages. Please try again.");
        setLoading(false);
      });
  }, [reload]);

  // try again button - runs useEffect again
  function handleRetry() {
    setLoading(true);
    setError(null);
    setReload(reload + 1);
  }

  function handleReset() {
    setSearchTerm("");
    setCategory("All");
    setSortBy("default");
  }

  // search -> filter -> sort
  const categories = getCategories(packages);
  const searched = searchPackages(packages, searchTerm);
  const filtered = filterByCategory(searched, category);
  const result = sortPackages(filtered, sortBy);

  // loading
  if (loading) {
    return (
      <section>
        <PageHeader title="Travel Packages" subtitle="Find your next trip around Malaysia." />
        <StatusMessage type="loading" message="Loading travel packages..." />
      </section>
    );
  }

  // error
  if (error) {
    return (
      <section>
        <PageHeader title="Travel Packages" subtitle="Find your next trip around Malaysia." />
        <StatusMessage type="error" message={error} onRetry={handleRetry} />
      </section>
    );
  }

  // no data from api
  if (packages.length === 0) {
    return (
      <section>
        <PageHeader title="Travel Packages" subtitle="Find your next trip around Malaysia." />
        <StatusMessage type="empty" message="No travel packages available right now. Please come back later." />
      </section>
    );
  }

  return (
    <section>
      <PageHeader title="Travel Packages" subtitle="Find your next trip around Malaysia." />

      <div className="package-filters">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <SortMenu value={sortBy} onChange={setSortBy} />
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <p className="package-count">
        Showing {result.length} of {packages.length} packages
      </p>

      {/* nothing matches the search / filter */}
      {result.length === 0 ? (
        <StatusMessage
          type="empty"
          message="No packages found. Try another keyword or category."
          onRetry={handleReset}
          buttonLabel="Clear Filters"
        />
      ) : (
        <div className="package-grid">
          {result.map((pkg) => (
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
    </section>
  );
}

export default Packages;
