import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const CustomerReview = () => {
  const sliderRef = useRef(null);
  useKeenSlider({
    loop: true,
    slidesPerView: 3,
    spacing: 25,
    breakpoints: {
      "(max-width: 767px)": {
        slidesPerView: 1,
      },
      "(max-width: 1023px)": {
        slidesPerView: 2,
      },
    },
    controls: true,
  });

  const testimonials = [
    {
      text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
      img: "img/testimonial-1.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
      img: "img/testimonial-2.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
      img: "img/testimonial-3.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
      img: "img/testimonial-3.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
      img: "img/testimonial-3.jpg",
      name: "Client Name",
      profession: "Profession",
    },
  ];

  return (
    <div>
      <div
        className="testimonial my-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div ref={sliderRef} className="keen-slider py-5">
            {testimonials.map((testimonial, index) => (
              <div className="keen-slider__slide" key={index}>
                <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
                  <p>{testimonial.text}</p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid flex-shrink-0 rounded"
                      src={testimonial.img}
                      alt="Testimonial"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div className="ps-3">
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small>{testimonial.profession}</small>
                    </div>
                  </div>
                  <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="keen-slider__control">
            <button className="keen-slider__prev">
              <i className="bi bi-arrow-left"></i>
            </button>
            <button className="keen-slider__next">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
