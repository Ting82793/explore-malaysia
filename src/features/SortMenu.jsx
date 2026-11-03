import "./Filters.css";

// Feature 3 - sort dropdown
function SortMenu(props) {
  return (
    <div className="filter-group">
      <label htmlFor="sort">Sort by</label>
      <select
        id="sort"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value="default">Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="duration-asc">Duration: Shortest</option>
        <option value="duration-desc">Duration: Longest</option>
      </select>
    </div>
  );
}

export default SortMenu;
