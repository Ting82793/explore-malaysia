import "./HighlightCard.css";

// Reusable card for ONE highlight on the About page.
// Props:
//   props.icon        – an emoji shown at the top
//   props.title       – short heading
//   props.description – one or two sentences
function HighlightCard(props) {
  return (
    <article className="highlight-card">
      <span className="highlight-icon" aria-hidden="true">
        {props.icon}
      </span>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </article>
  );
}

export default HighlightCard;
