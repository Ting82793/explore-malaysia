import "./StatusMessage.css";

// Reusable message box for loading, error and empty states.
// Props:
//   props.type        – "loading", "error" or "empty"
//   props.message     – the text to show
//   props.onRetry     – (optional) function to run when the button is clicked
//   props.buttonLabel – (optional) text on the button, "Try Again" if not given
function StatusMessage(props) {
  const buttonLabel = props.buttonLabel || "Try Again";

  return (
    <div
      className={`status-message status-${props.type}`}
      // role="alert" makes screen readers read errors out straight away
      role={props.type === "error" ? "alert" : "status"}
    >
      {props.type === "loading" && (
        <div className="spinner" aria-hidden="true"></div>
      )}
      {props.type === "error" && (
        <span className="status-icon" aria-hidden="true">⚠️</span>
      )}
      {props.type === "empty" && (
        <span className="status-icon" aria-hidden="true">🧳</span>
      )}

      <p>{props.message}</p>

      {/* Only show the button if a function was passed in */}
      {props.onRetry && (
        <button className="retry-btn" onClick={props.onRetry}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
