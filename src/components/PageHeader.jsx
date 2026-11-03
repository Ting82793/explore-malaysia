import "./PageHeader.css";

// title at the top of each page
function PageHeader(props) {
  return (
    <header className="page-header">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </header>
  );
}

export default PageHeader;
