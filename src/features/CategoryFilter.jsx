import "./Filters.css";

// Feature 2 - category dropdown
function CategoryFilter(props) {
  return (
    <div className="filter-group">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "All" ? "All categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
