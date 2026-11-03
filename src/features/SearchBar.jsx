import "./Filters.css";

// FEATURE 1: Search box (controlled input)
// Props:
//   props.value    – the current search text (stored in Packages.jsx)
//   props.onChange – function that updates the search text
function SearchBar(props) {
  return (
    <div className="filter-group filter-search">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Destination or state, e.g. Penang"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
