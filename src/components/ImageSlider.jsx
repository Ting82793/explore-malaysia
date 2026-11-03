import { useState, useEffect } from "react";
import "./ImageSlider.css";

// Reusable image slider.
// Props:
//   props.slides   – array of { id, image, alt, caption }
//   props.interval – milliseconds between slide changes (5000 if not given)
//   props.children – content shown on top of the slides (title, buttons)
function ImageSlider(props) {
  const slides = props.slides;
  const interval = props.interval || 5000;

  // State: which slide is showing now (0 = first slide)
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToNext() {
    // % (remainder) makes it go back to 0 after the last slide
    setCurrentIndex((currentIndex + 1) % slides.length);
  }

  function goToPrevious() {
    // + slides.length stops the number going below 0
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  }

  // useEffect with a timer: go to the next slide every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, interval);

    // Cleanup: stop the old timer before the next one starts
    return () => clearInterval(timer);
  }, [currentIndex, interval, slides.length]);

  return (
    <div className="slider">
      {/* All slides are stacked; only the "active" one is visible */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={index === currentIndex ? "slide active" : "slide"}
        >
          <img src={slide.image} alt={slide.alt} />
          <span className="slide-caption">{slide.caption}</span>
        </div>
      ))}

      {/* Content passed in between <ImageSlider> and </ImageSlider> */}
      <div className="slider-overlay">{props.children}</div>

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
