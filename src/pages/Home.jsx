import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import "./Home.css";

// pictures for the slider (in public/images)
const slides = [
  {
    id: 1,
    image: "/images/langkawi.jpg",
    alt: "Beach with blue sea in Langkawi",
    caption: "Langkawi, Kedah",
  },
  {
    id: 2,
    image: "/images/penang.jpg",
    alt: "Old shophouses in George Town, Penang",
    caption: "George Town, Penang",
  },
  {
    id: 3,
    image: "/images/cameron.jpg",
    alt: "Tea plantation in Cameron Highlands",
    caption: "Cameron Highlands, Pahang",
  },
  {
    id: 4,
    image: "/images/kualalumpur.jpg",
    alt: "Kuala Lumpur city at night",
    caption: "Kuala Lumpur",
  },
];

function Home() {
  return (
    <div className="home">
      <ImageSlider slides={slides} interval={5000}>
        <h1 className="hero-title">Explore Malaysia</h1>
        <p className="hero-tagline">Discover Malaysia, Create Memories.</p>
        <div className="hero-buttons">
          <Link to="/packages" className="btn btn-light">
            View Packages
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </ImageSlider>

      <section className="home-intro">
        <h2>Your local guide to Malaysia</h2>
        <p>
          From island beaches and cool highlands to heritage towns and city
          lights, Explore Malaysia brings you travel packages all around the
          country.
        </p>
        <Link to="/about" className="btn btn-primary">
          Learn More About Us
        </Link>
      </section>
    </div>
  );
}

export default Home;
