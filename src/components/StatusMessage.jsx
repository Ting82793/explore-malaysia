import "./StatusMessage.css";

// used for loading, error and no data messages
// props: type, message, onRetry (optional), buttonLabel (optional)
function StatusMessage(props) {
  const buttonLabel = props.buttonLabel || "Try Again";

  return (
    <div className={"status-message status-" + props.type}>
      {props.type === "loading" && <div className="spinner"></div>}
      {props.type === "error" && <span className="status-icon">⚠️</span>}
      {props.type === "empty" && <span className="status-icon">🧳</span>}

      <p>{props.message}</p>

      {/* only show button if onRetry is given */}
      {props.onRetry && (
        <button className="retry-btn" onClick={props.onRetry}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
