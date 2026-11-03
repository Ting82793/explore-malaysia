import { Link } from "react-router-dom";
import "./PackageCard.css";

// Which CSS class (badge colour) to use for each category
const badgeClasses = {
  "Beach & Island": "badge-beach-island",
  "Culture & Heritage": "badge-culture-heritage",
  Highlands: "badge-highlands",
  City: "badge-city",
  "Nature & Adventure": "badge-nature-adventure",
};

// Reusable card that shows ONE travel package.
// Props come from one item in packages.json:
//   props.id, props.destination, props.state, props.category,
//   props.durationDays, props.durationNights, props.price, props.description
function PackageCard(props) {
  const badgeClass = badgeClasses[props.category] || "";

  // 1599 -> "1,599"
  const formattedPrice = props.price.toLocaleString("en-MY");

  return (
    <article className="package-card">
      <span className={`category-badge ${badgeClass}`}>{props.category}</span>

      <h3 className="package-destination">{props.destination}</h3>
      <p className="package-state">📍 {props.state}</p>

      <p className="package-description">{props.description}</p>

      <div className="package-footer">
        <span className="package-duration">
          🕒 {props.durationDays} Days {props.durationNights} Nights
        </span>
        <span className="package-price">
          RM {formattedPrice}
          <small> / person</small>
        </span>
      </div>

      {/* Template literal builds the link, e.g. /packages/3 */}
      <Link to={`/packages/${props.id}`} className="details-btn">
        View Details
      </Link>
    </article>
  );
}

export default PackageCard;
