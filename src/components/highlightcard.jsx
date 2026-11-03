import "./highlightcard.css";

// Reusable card for ONE highlight on the About page.
// Props:
//   icon        – an emoji shown at the top
//   title       – short heading
//   description – one or two sentences
function HighlightCard({ icon, title, description }) {
  return (
    <article className="highlight-card">
      <span className="highlight-icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default HighlightCard;
