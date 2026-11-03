import "./Filters.css";

// FEATURE 2: Category dropdown (controlled select)
// Props:
//   props.categories – list of categories, e.g. ["All", "City", ...]
//   props.value      – the selected category (stored in Packages.jsx)
//   props.onChange   – function that updates the selected category
function CategoryFilter(props) {
  return (
    <div className="filter-group">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
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
