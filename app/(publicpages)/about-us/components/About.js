// pages/about.js
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div>
      {/* About Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="bebas-neue-regular">
              S.S National Educational Council
            </h2>
            <p className="text-dark text-justify">
              Welcome to MGS Guest House, where luxury meets comfort. Located in
              the heart of the city, our home stay offers top-notch amenities
              and services to ensure your stay is memorable. From our
              well-appointed rooms to our gourmet dining options, we strive to
              provide an exceptional experience for every guest.
            </p>

            <p className="text-dark text-justify">
              At MGS Guest House, we pride ourselves on providing
              state-of-the-art facilities and a variety of unique services to
              make your stay truly memorable. Guests can enjoy heritage walks to
              explore the rich cultural history of the area, along with
              convenient rental car arrangements for independent travel. For
              those seeking relaxation and personal growth, we offer access to
              experienced yoga instructors and renowned Indian classical music
              teachers, enabling you to immerse yourself in local traditions and
              wellness practices. With our prime location near the city's main
              attractions, MGS Guest House is dedicated to offering an
              unforgettable experience that combines comfort, convenience, and
              cultural enrichment.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/assets/img/gallery/IMG_5342.webp"
              alt="Hotel Image"
              width={500}
              height={500}
              className="img-fluid rounded w-100"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row m-0">
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Our Story
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5513.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      Founded with the vision of creating a warm and welcoming
                      environment, Mishra Ganesh Shankar Guest House has grown
                      into a premier destination for travelers seeking both
                      luxury and affordability. Our commitment to excellence is
                      reflected in every aspect of our home stay, from the
                      meticulously designed rooms to the personalized service
                      provided by our dedicated staff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1 shadow">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Accomodation
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5391.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      Mishra Ganesh Shankar Guest House offers a range of
                      elegantly furnished rooms and suites to cater to the
                      diverse needs of our guests. Each room is equipped with
                      modern amenities, including high-speed Wi-Fi, flat-screen
                      TVs, and comfortable bedding, ensuring a restful and
                      productive stay. Whether you're here for business or
                      leisure, you'll find the perfect space to unwind and
                      recharge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1 shadow">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Amenities
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5522.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      We believe in providing our guests with an list of
                      amenities to enhance their stay. Enjoy a delicious
                      complimentary breakfast each morning or relax by open
                      sitting area. Our on-site meal service offers a variety of
                      culinary delights, and our 24-hour room service ensures
                      you can dine in the comfort of your room at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Safety and Security
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5496.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      Your safety is our top priority. Mishra Ganesh Shankar
                      Guest House is equipped with comprehensive fire security
                      systems, including smoke detectors, fire alarms, and
                      sprinkler systems, ensuring a secure environment for all
                      our guests. Our staff is trained in emergency procedures,
                      and we conduct regular fire drills to maintain the highest
                      standards of safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Location
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5354.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      Conveniently located at the most prime location in Assi,
                      Varanasi - Uttar Pradesh, Mishra Ganesh Shankar Guest
                      House offers easy access to major attractions, business
                      districts, and transportation hubs. Whether you're
                      exploring the city's cultural landmarks or attending
                      meetings, you'll find our location to be ideal for all
                      your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-1">
            <div className="bg-warning rounded pt-1 shadow">
              <div className="bg-white rounded mb-0 border border-dark">
                <h2 className="text-center  shadow rounded  p-2 m-0 bebas-neue-regular">
                  Exceptional Service
                </h2>
                <div className="row m-0">
                  <div className="col-md-3 p-2">
                    <Image
                      src={"/assets/img/gallery/IMG_5338.webp"}
                      width={100}
                      height={100}
                      className="img-fluid w-100 h-100 rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <p className="m-0 py-3 text-justify px-1">
                      At Mishra Ganesh Shankar Guest House, we are dedicated to
                      providing personalized service that exceeds your
                      expectations. Our friendly and professional staff is
                      always on hand to assist with any request, from arranging
                      transportation to recommending local attractions. We
                      strive to make your stay as comfortable and enjoyable as
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow mt-5 py-4 border border-dark">
            Experience the perfect blend of comfort, convenience, and
            hospitality at Mishra Ganesh Shankar Guest House. We look forward to
            welcoming you and making your stay with us truly unforgettable.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
