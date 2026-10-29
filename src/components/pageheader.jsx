import "./pageheader.css";

// Reusable page heading used on Packages, About and Contact.
// Props:
//   title    – main heading text
//   subtitle – short line under the heading
function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default PageHeader;
