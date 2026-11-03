import "./packagefilters.css";

// Reusable toolbar with the search box, category filter and sort menu.
// It does NOT store anything itself – the Packages page owns the state
// and passes the values + "change" functions down as props.
function PackageFilters({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onReset,
}) {
  return (
    <div className="package-filters">
      {/* FEATURE 1: Search */}
      <div className="filter-group filter-search">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          placeholder="Destination or state, e.g. Penang"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* FEATURE 2: Category filter */}
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* FEATURE 3: Sort */}
      <div className="filter-group">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration-asc">Duration: Shortest First</option>
          <option value="duration-desc">Duration: Longest First</option>
        </select>
      </div>

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default PackageFilters;
