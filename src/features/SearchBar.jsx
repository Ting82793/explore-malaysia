import "./Filters.css";

// Feature 1 - search box
function SearchBar(props) {
  return (
    <div className="filter-group filter-search">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        placeholder="Search destination or state e.g. Penang"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
