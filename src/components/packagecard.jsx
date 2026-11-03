import "./packagecard.css";

// Reusable card that shows ONE travel package.
// Props come from one item in packages.json,
// plus onViewDetails – a function to open the details pop-up.
function PackageCard({
  destination,
  state,
  category,
  durationDays,
  durationNights,
  price,
  description,
  onViewDetails,
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

      <button type="button" className="details-btn" onClick={onViewDetails}>
        View Details
      </button>
    </article>
  );
}

export default PackageCard;
