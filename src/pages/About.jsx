import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import HighlightCard from "../components/HighlightCard";
import "./About.css";

// Highlight data – stored as an array, then shown with .map()
const highlights = [
  {
    id: 1,
    icon: "🧭",
    title: "Local Experts",
    description:
      "Our team is made up of Malaysians who know the best spots, food and hidden gems in every state.",
  },
  {
    id: 2,
    icon: "💰",
    title: "Affordable Packages",
    description:
      "Clear prices with no hidden charges, so you can plan a great trip that fits your budget.",
  },
  {
    id: 3,
    icon: "🗺️",
    title: "Trips Across Malaysia",
    description:
      "From Langkawi to Sabah, we cover beaches, highlands, heritage towns, cities and rainforests.",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Friendly Support",
    description:
      "Have a question before or during your trip? Our team is always happy to help.",
  },
];

function About() {
  return (
    <section className="about-page">
      <PageHeader
        title="About Us"
        subtitle="Get to know the team behind Explore Malaysia."
      />

      {/* Company description */}
      <div className="about-story">
        <div className="about-text">
          <h2>Who we are</h2>
          <p>
            Explore Malaysia is a local travel agency that helps travellers
            discover the beauty of Malaysia. We plan simple, well-organised
            travel packages so our customers can relax and enjoy the journey.
          </p>
          <p>
            Whether you want a beach holiday, a cool highland break, a food
            trip or a jungle adventure, we have a package for you.
          </p>
        </div>

        <div className="about-mission">
          <h3>Our Mission</h3>
          <p>
            To make travelling around Malaysia easy, affordable and memorable
            for everyone.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <h2 className="about-heading">Why Travel With Us</h2>
      <div className="highlight-grid">
        {highlights.map((item) => (
          <HighlightCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      {/* Call to action */}
      <div className="about-cta">
        <h2>Ready for your next trip?</h2>
        <Link to="/packages" className="btn btn-primary">
          Browse Packages
        </Link>
      </div>
    </section>
  );
}

export default About;
