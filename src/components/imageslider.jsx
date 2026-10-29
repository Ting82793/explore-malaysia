import { useState, useEffect } from "react";
import "./imageslider.css";

// Reusable image slider.
// Props:
//   slides   – array of { id, image, alt, caption }
//   interval – milliseconds between automatic slide changes (default 5000)
//   children – any content to show on top of the slides (e.g. title, buttons)
function ImageSlider({ slides, interval = 5000, children }) {
  // Which slide is showing right now (0 = first slide)
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToNext() {
    // % slides.length makes it loop back to 0 after the last slide
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }

  function goToPrevious() {
    // + slides.length stops the number going below 0
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  // Auto-play: move to the next slide every `interval` milliseconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    // Cleanup: stop the old timer before a new one starts
    // (also restarts the countdown when the user clicks a button)
    return () => clearInterval(timer);
  }, [currentIndex, interval, slides.length]);

  return (
    <div className="slider">
      {/* All slides are stacked; only the active one is visible */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={index === currentIndex ? "slide active" : "slide"}
        >
          <img src={slide.image} alt={slide.alt} />
          <span className="slide-caption">{slide.caption}</span>
        </div>
      ))}

      {/* Content passed in from the parent (title, tagline, buttons) */}
      <div className="slider-overlay">{children}</div>

      <button
        className="slider-btn prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="slider-btn next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* One dot per slide; click a dot to jump to that slide */}
      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;