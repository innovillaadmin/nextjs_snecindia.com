import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MdHeight } from "react-icons/md";
import Link from "next/link";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function HomePageSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="container-fluid bg-dark mt-2 pt-5 pb-3">
      <div className="container">
        <div className="row m-0">
          <div className="col-md-6 bg-dark rounded mt-1 p-1">
            <div className="p-5">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                Empowering Education
              </h6>
              <h1 className="text-white mb-4">
                Discover a Place to Learn and Grow
              </h1>
              <p className="text-white mb-4">
                Experience an inspiring educational environment where academic
                excellence meets personal development. Our institute offers
                state-of-the-art facilities, expert faculty, and a supportive
                atmosphere designed to help every student succeed—whether you're
                starting your journey or advancing your career.
              </p>
              <a
                href=""
                className="btn base-gradient text-dark py-md-3 px-md-5 me-3"
              >
                Contact Us
              </a>
              <Link href={"/courses"} className="btn btn-light py-md-3 px-md-5">
                Explore Courses
              </Link>
            </div>
          </div>
          <div className="col-md-6 mt-1 p-1 pt-0">
            <div
              ref={sliderRef}
              className="keen-slider"
              style={{ maxHeight: "50vh" }}
            >
              <div className="border border-dark keen-slider__slide rounded number-slide3 ">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/1.jpeg"
                />
              </div>
              <div className="border border-dark keen-slider__slide rounded number-slide1">
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/2.jpeg"
                />
              </div>
              <div className="border border-dark keen-slider__slide rounded number-slide2 ">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/3.jpeg"
                />
              </div>

              <div className="border border-dark keen-slider__slide rounded number-slide4 ">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/4.jpeg"
                />
              </div>
            </div>

            <div
              ref={thumbnailRef}
              className="keen-slider thumbnail mt-2"
              style={{ maxHeight: "30vh" }}
            >
              <div className="keen-slider__slide rounded number-slide3">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/1.jpeg"
                />
              </div>
              <div className="keen-slider__slide rounded number-slide1">
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/2.jpeg"
                />
              </div>
              <div className="keen-slider__slide rounded number-slide2">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/3.jpeg"
                />
              </div>

              <div className="keen-slider__slide rounded number-slide4">
                {" "}
                <img
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/4.jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
