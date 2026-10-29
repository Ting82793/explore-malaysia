import "./packagecard.css";

// Reusable card that shows ONE travel package.
// Props come from one item in packages.json.
function PackageCard({
  destination,
  state,
  category,
  durationDays,
  durationNights,
  price,
  description,
}) {
  // "Beach & Island" -> "beach-island" (used for the badge colour in CSS)
  const categoryClass = category.toLowerCase().replace(/[^a-z]+/g, "-");

  // 1299 -> "1,299"
  const formattedPrice = price.toLocaleString("en-MY");

  return (
    <article className="package-card">
      <span className={`category-badge badge-${categoryClass}`}>{category}</span>

      <h3 className="package-destination">{destination}</h3>
      <p className="package-state">📍 {state}</p>

      <p className="package-description">{description}</p>

      <div className="package-footer">
        <span className="package-duration">
          🕒 {durationDays} Days {durationNights} Nights
        </span>
        <span className="package-price">
          RM {formattedPrice}
          <small> / person</small>
        </span>
      </div>
    </article>
  );
}

export default PackageCard;
