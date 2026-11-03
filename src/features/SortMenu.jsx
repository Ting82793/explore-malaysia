import "./Filters.css";

// FEATURE 3: Sort dropdown (controlled select)
// Props:
//   props.value    – the chosen sort option (stored in Packages.jsx)
//   props.onChange – function that updates the sort option
function SortMenu(props) {
  return (
    <div className="filter-group">
      <label htmlFor="sort">Sort by</label>
      <select
        id="sort"
        name="sort"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value="default">Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="duration-asc">Duration: Shortest First</option>
        <option value="duration-desc">Duration: Longest First</option>
      </select>
    </div>
  );
}

export default SortMenu;
