import React, {useState} from "react";

export default function Carousel({ images }) {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handlePrev = () => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
              {image.endsWith('.mp4') ? (
                <video controls className="d-block w-100" src={image} />
              ) : (
                <img className="d-block w-100" src={image} alt="Slide" />
              )}
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" onClick={handlePrev}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Anterior</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" onClick={handleNext}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Próximo</span>
        </a>
      </div>
    );
  }