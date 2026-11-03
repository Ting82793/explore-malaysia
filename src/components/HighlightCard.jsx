import "./HighlightCard.css";

// one card in the "Why Travel With Us" section
function HighlightCard(props) {
  return (
    <div className="highlight-card">
      <span className="highlight-icon">{props.icon}</span>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default HighlightCard;
