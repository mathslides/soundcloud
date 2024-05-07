import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SliderData } from "./SliderData";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const slideChange = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
    setIsContentVisible(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      slideChange();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsContentVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div className="bg-gray-800 relative">
      <Carousel
        selectedItem={currentSlide}
        showThumbs={false}
        showStatus={false}
        interval={6000}
        onChange={(index) => setCurrentSlide(index)}
      >
        {SliderData.map((slide, index) => (
          <div key={index}>
            <img
              className="w-full h-auto"
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            {isContentVisible && (
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-8">
                {index === 0 && (
                  <>
                    <h2 className="text-white text-3xl font-bold mb-4">
                      Discover more with RecordLabel Go+
                    </h2>
                    <p className="text-white text-lg">
                      RecordLabel Go+ lets you listen offline, ad-free, with
                      over 150 million tracks — and growing.
                    </p>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h2 className="text-white text-3xl font-bold mb-4">
                      What's next in music is first on RecordLabel
                    </h2>
                    <p className="text-white text-lg">
                      Upload your first track and begin your journey.
                      RecordLabel gives you space to create, find your fans,
                      and connect with other artists.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
