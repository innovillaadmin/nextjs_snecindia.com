"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "@/app/config";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MdHeight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import BtnBookThisRoom from "./BtnBookThisRoom";

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

export default function RoomSlider4() {
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
  const [roomrate, setroomrate] = useState("0");
  const [roomdata, setroomdata] = useState([]);

  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getroominfofromdb",
        roomid: 4,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setroomdata(r.data.retval);
          setroomrate(r.data.retval.offer_price);
        }
      });
  }, []);
  return (
    <div className="container-fluid pt-3 pb-3">
      <h2 className="fs-1 bebas-neue-regular text-center py-5">Room 4</h2>
      <div className="container">
        <div className="row m-0">
          <div className="col-md-6 bg-dark rounded mt-1 p-1  order-2 order-md-1">
            <div className="px-2 py-2 px-md-5 py-md-4">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                @ INR {roomrate > 0 ? roomrate : 0} Only
              </h6>
              <h1 className="text-white mb-4">Enjoy Exquisite Room Décor </h1>
              <p className="text-white mb-4">
                Our rooms are designed for ultimate relaxation, with exquisite
                decor, luxurious linens, and personalized touches to enhance
                your experience.
              </p>
              <Link
                href={"contact-us"}
                className="btn base-gradient text-dark py-md-3 px-md-5 me-3"
              >
                Contact Us
              </Link>
              <BtnBookThisRoom roomid={"4"} key={4} roomdata={roomdata} />
            </div>
          </div>
          <div className="col-md-6 mt-1 p-1 pt-0  order-1 order-md-2">
            <div
              ref={sliderRef}
              className="keen-slider"
              style={{ maxHeight: "50vh" }}
            >
              <div className="border  keen-slider__slide rounded number-slide1">
                <Image
                  width={500}
                  height={500}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5454.webp"
                />
              </div>
              <div className="border  keen-slider__slide rounded number-slide2 ">
                {" "}
                <Image
                  width={500}
                  height={500}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5443.webp"
                />
              </div>
              <div className="border  keen-slider__slide rounded number-slide3 ">
                {" "}
                <Image
                  width={500}
                  height={500}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5442.webp"
                />
              </div>
              <div className="border  keen-slider__slide rounded number-slide4 ">
                {" "}
                <Image
                  width={500}
                  height={500}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5438.webp"
                />
              </div>
            </div>

            <div
              ref={thumbnailRef}
              className="keen-slider thumbnail mt-2"
              style={{ maxHeight: "30vh" }}
            >
              <div className="keen-slider__slide rounded number-slide1">
                <Image
                  width={150}
                  height={150}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5454.webp"
                />
              </div>
              <div className="keen-slider__slide rounded number-slide2">
                {" "}
                <Image
                  width={150}
                  height={150}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5443.webp"
                />
              </div>
              <div className="keen-slider__slide rounded number-slide3">
                {" "}
                <Image
                  width={150}
                  height={150}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5442.webp"
                />
              </div>
              <div className="keen-slider__slide rounded number-slide4">
                {" "}
                <Image
                  width={150}
                  height={150}
                  className="img-fluid rounded w-100 object-fit-cover"
                  data-bs-wow-delay="0.3s"
                  src="/assets/img/gallery/IMG_5438.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
