import { useEffect, useRef } from "react";
import "./packagedetails.css";

// FEATURE 4: Pop-up (modal) that shows the full details of one package.
// Props:
//   pkg     – the package object to show
//   onClose – function that closes the pop-up
function PackageDetails({ pkg, onClose }) {
  // useRef gives us direct access to the close button on the page
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Move keyboard focus to the close button when the pop-up opens
    closeButtonRef.current.focus();

    // Close the pop-up when the Escape key is pressed
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    // Stop the page behind from scrolling while the pop-up is open
    document.body.style.overflow = "hidden";

    // Cleanup: undo everything when the pop-up closes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Clicking the dark background (but not the white box) closes it
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close package details"
        >
          ✕
        </button>

        <span className="modal-category">{pkg.category}</span>
        <h2 id="modal-title">{pkg.destination}</h2>
        <p className="modal-state">📍 {pkg.state}</p>

        <p className="modal-description">{pkg.description}</p>

        <div className="modal-info">
          <div>
            <span className="info-label">Duration</span>
            <span className="info-value">
              {pkg.durationDays} Days {pkg.durationNights} Nights
            </span>
          </div>
          <div>
            <span className="info-label">Price</span>
            <span className="info-value">
              RM {pkg.price.toLocaleString("en-MY")} / person
            </span>
          </div>
        </div>

        <h3>What's included</h3>
        <ul className="modal-inclusions">
          {pkg.inclusions.map((item) => (
            <li key={item}>✔ {item}</li>
          ))}
        </ul>

        <button className="modal-done" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PackageDetails;
