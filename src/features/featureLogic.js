// ==========================================================
// The logic behind the new features on the Packages page.
// These are normal JavaScript functions (not components):
// they take the list of packages in, and give a new list back.
// The original list from the API is never changed.
// ==========================================================

// ---------- FEATURE 1: Search ----------
// Keeps packages whose destination OR state contains the search text.
// Example: "pahang" matches "Cameron Highlands Tea Retreat" (state: Pahang)
export function searchPackages(packages, searchTerm) {
  const searchText = searchTerm.trim().toLowerCase();

  return packages.filter((pkg) => {
    return (
      pkg.destination.toLowerCase().includes(searchText) ||
      pkg.state.toLowerCase().includes(searchText)
    );
  });
}

// ---------- FEATURE 2: Category filter ----------
// Keeps packages in the chosen category ("All" keeps everything).
export function filterByCategory(packages, category) {
  if (category === "All") {
    return packages;
  }
  return packages.filter((pkg) => pkg.category === category);
}

// Builds the list of categories for the dropdown, e.g.
// ["All", "Beach & Island", "Culture & Heritage", ...]
// Each category is added only once.
export function getCategories(packages) {
  const categories = ["All"];

  packages.forEach((pkg) => {
    if (!categories.includes(pkg.category)) {
      categories.push(pkg.category);
    }
  });

  return categories;
}

// ---------- FEATURE 3: Sort ----------
// .slice() makes a copy first, because .sort() changes the list it is given.
// In the compare function: negative = a goes first, positive = b goes first.
export function sortPackages(packages, sortBy) {
  const copy = packages.slice();

  return copy.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "duration-asc") return a.durationDays - b.durationDays;
    if (sortBy === "duration-desc") return b.durationDays - a.durationDays;
    return a.id - b.id; // "Recommended" = original order
  });
}

// FEATURE 4 (Package details page) is in PackageDetails.jsx
