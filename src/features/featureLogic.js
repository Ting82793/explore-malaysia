// functions for the new features on the packages page

// Feature 1 - search by destination or state
export function searchPackages(packages, searchTerm) {
  const text = searchTerm.trim().toLowerCase();

  return packages.filter((pkg) => {
    return (
      pkg.destination.toLowerCase().includes(text) ||
      pkg.state.toLowerCase().includes(text)
    );
  });
}

// Feature 2 - filter by category
export function filterByCategory(packages, category) {
  if (category === "All") {
    return packages;
  }
  return packages.filter((pkg) => pkg.category === category);
}

// get all the categories for the dropdown (no repeats)
export function getCategories(packages) {
  const categories = ["All"];

  packages.forEach((pkg) => {
    if (!categories.includes(pkg.category)) {
      categories.push(pkg.category);
    }
  });

  return categories;
}

// Feature 3 - sort by price or duration
export function sortPackages(packages, sortBy) {
  // copy the list first so the original data doesn't change
  const copy = packages.slice();

  return copy.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "duration-asc") return a.durationDays - b.durationDays;
    if (sortBy === "duration-desc") return b.durationDays - a.durationDays;
    return a.id - b.id;
  });
}

// Feature 4 (details page) is in PackageDetails.jsx
