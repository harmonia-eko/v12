import React from "react";
import Swiper from "react-id-swiper";
import 'swiper/swiper-bundle.css';
import SliderButtons from "../../../elements/SliderButtons/SliderButtons";

const ConstructionSlider = ({ data }) => {
  const params = {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  return (
    <section className="pt-0 pb-0">
      <div className="slider-bg flexslider">
        <ul className="slides">
          <Swiper {...params}>
            {data.map((slide) => (
              <li key={slide.id}>
                <div
                  className="slide-img"
                  style={{
                    background: `url(${"/assets/images/" +
                      slide.image}) center center / cover scroll no-repeat`,
                  }}
                ></div>
                <div
                  className={
                    "hero-text-wrap " + (slide.bg ? "gradient-overlay-bg" : "")
                  }
                >
                  <div className="hero-text white-color">
                    <div className="container text-center">
                      <h4 className="white-color font-400 letter-spacing-5 text-uppercase">
                        {slide.tagline ? slide.tagline : ""}
                      </h4>
                      <h2 className="white-color font-700 text-uppercase">
                        {slide.title}
                      </h2>
                      {slide.buttons.length !== 0 ? (
                        <p className="text-center mt-30">
                          <SliderButtons buttons={slide.buttons} />
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default ConstructionSlider;
