import "./statusmessage.css";

// Reusable message box for loading, error and empty states.
// Props:
//   type        – "loading", "error" or "empty"
//   message     – the text to show
//   onRetry     – (optional) function to run when the button is clicked
//   buttonLabel – (optional) text on the button, "Try Again" by default
function StatusMessage({ type, message, onRetry, buttonLabel = "Try Again" }) {
  return (
    <div
      className={`status-message status-${type}`}
      // role="alert" makes screen readers announce errors immediately
      role={type === "error" ? "alert" : "status"}
    >
      {type === "loading" && <div className="spinner" aria-hidden="true"></div>}
      {type === "error" && <span className="status-icon" aria-hidden="true">⚠️</span>}
      {type === "empty" && <span className="status-icon" aria-hidden="true">🧳</span>}

      <p>{message}</p>

      {/* Only show the button if a function was passed in */}
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
