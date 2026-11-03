import "./PageHeader.css";

// Reusable page heading used on Packages, About and Contact.
// Props:
//   props.title    – main heading text
//   props.subtitle – short line under the heading
function PageHeader(props) {
  return (
    <header className="page-header">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </header>
  );
}

export default PageHeader;
