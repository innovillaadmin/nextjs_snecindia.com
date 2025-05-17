import React from "react";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../home/Newsletter";
import Hero from "./Hero";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const page = () => {
  const photos = [
    { src: "/assets/img/gallery/IMG_5334.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5335.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5336.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5338.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5339.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5340.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5341.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5342.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5344.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5345.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5346.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5347.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5348.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5349.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5352.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5354.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5355.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5357.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5358.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5359.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5360.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5371.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5372.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5373.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5374.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5376.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5377.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5378.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5379.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5380.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5381.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5382.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5383.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5384.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5386.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5388.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5389.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5390.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5391.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5392.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5393.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5395.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5398.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5399.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5401.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5403.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5404.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5405.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5406.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5407.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5408.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5409.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5412.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5413.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5414.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5415.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5416.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5418.webp", width: 200, height: 150 },
    { src: "/assets/img/gallery/IMG_5420.webp", width: 200, height: 150 },
  ];
  return (
    <>
      <Hero />
      <div className="container text-center my-5">
        <h1 className="bebas-neue-regular">Explore Our Gallery</h1>
        <p>
          Welcome to our gallery page! Here you can find a collection of
          stunning images showcasing our services, destinations, and
          experiences. Click on any image to view it in full size and explore
          the details. Our gallery is designed to give you a glimpse into the
          amazing adventures we offer. Enjoy!
        </p>
      </div>
      <div className="container mt-4 react-photo-album-styling">
        <RowsPhotoAlbum photos={photos} />
      </div>

      <Newsletter />
      <FooterPublic />
    </>
  );
};

export default page;
