import "./statusmessage.css";

// Reusable message box for loading, error and empty states.
// Props:
//   type    – "loading", "error" or "empty"
//   message – the text to show
//   onRetry – (optional) function to run when the "Try Again" button is clicked
function StatusMessage({ type, message, onRetry }) {
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

      {/* Only show the button if a retry function was passed in */}
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
