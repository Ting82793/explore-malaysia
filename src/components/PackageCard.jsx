import { Link } from "react-router-dom";
import "./PackageCard.css";

// badge colour for each category
const badgeColours = {
  "Beach & Island": "badge-beach-island",
  "Culture & Heritage": "badge-culture-heritage",
  Highlands: "badge-highlands",
  City: "badge-city",
  "Nature & Adventure": "badge-nature-adventure",
};

// shows one travel package
function PackageCard(props) {
  const badge = badgeColours[props.category];

  return (
    <div className="package-card">
      <span className={"category-badge " + badge}>{props.category}</span>

      <h3 className="package-destination">{props.destination}</h3>
      <p className="package-state">📍 {props.state}</p>
      <p className="package-description">{props.description}</p>

      <div className="package-footer">
        <span className="package-duration">
          🕒 {props.durationDays} Days {props.durationNights} Nights
        </span>
        <span className="package-price">
          RM {props.price.toLocaleString()}
          <small> / person</small>
        </span>
      </div>

      {/* goes to the details page e.g. /packages/3 */}
      <Link to={`/packages/${props.id}`} className="details-btn">
        View Details
      </Link>
    </div>
  );
}

export default PackageCard;
