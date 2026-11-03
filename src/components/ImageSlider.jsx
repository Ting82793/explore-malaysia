import { useState, useEffect } from "react";
import "./ImageSlider.css";

// slider for the home page banner
// props: slides, interval, children (the text on top of the pictures)
function ImageSlider(props) {
  const slides = props.slides;
  const interval = props.interval || 5000;

  const [currentIndex, setCurrentIndex] = useState(0);

  function goToNext() {
    // % so it goes back to the first slide after the last one
    setCurrentIndex((currentIndex + 1) % slides.length);
  }

  function goToPrevious() {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  }

  // change slide automatically every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, interval);

    // clear the old timer
    return () => clearInterval(timer);
  }, [currentIndex, interval, slides.length]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={index === currentIndex ? "slide active" : "slide"}
        >
          <img src={slide.image} alt={slide.alt} />
          <span className="slide-caption">{slide.caption}</span>
        </div>
      ))}

      <div className="slider-overlay">{props.children}</div>

      <button className="slider-btn prev" onClick={goToPrevious} aria-label="Previous slide">
        ‹
      </button>
      <button className="slider-btn next" onClick={goToNext} aria-label="Next slide">
        ›
      </button>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
            aria-label={"Go to slide " + (index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
