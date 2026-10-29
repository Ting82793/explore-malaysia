import { Link } from "react-router-dom";
import ImageSlider from "../components/imageslider.jsx";
import "./home.css";

// Slide data – images live in public/images/
// Each slide has a unique id (for React keys) and alt text (for accessibility)
const slides = [
  {
    id: 1,
    image: "/images/langkawi.jpg",
    alt: "Clear blue sea and white sand beach on Langkawi island",
    caption: "Langkawi, Kedah",
  },
  {
    id: 2,
    image: "/images/penang.jpg",
    alt: "Colourful heritage shophouses in George Town, Penang",
    caption: "George Town, Penang",
  },
  {
    id: 3,
    image: "/images/cameron.jpg",
    alt: "Green rolling tea plantations in Cameron Highlands",
    caption: "Cameron Highlands, Pahang",
  },
  {
    id: 4,
    image: "/images/kualalumpur.jpg",
    alt: "Kuala Lumpur city skyline at night",
    caption: "Kuala Lumpur",
  },
];

function Home() {
  return (
    <div className="home">
      {/* Hero banner: slider with agency name, tagline and buttons on top */}
      <ImageSlider slides={slides} interval={5000}>
        <h1 className="hero-title">Explore Malaysia</h1>
        <p className="hero-tagline">Discover Malaysia, Create Memories.</p>
        <div className="hero-buttons">
          <Link to="/packages" className="btn btn-primary">
            View Packages
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </ImageSlider>

      {/* Short introduction below the banner */}
      <section className="home-intro">
        <h2>Your local guide to Malaysia</h2>
        <p>
          From island beaches and cool highlands to heritage towns and city
          lights, Explore Malaysia brings you carefully planned travel packages
          across the country.
        </p>
        <Link to="/about" className="btn btn-primary">
          Learn More About Us
        </Link>
      </section>
    </div>
  );
}

export default Home;