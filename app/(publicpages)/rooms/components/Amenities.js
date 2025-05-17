// components/Amenities.js
import React from "react";

const Amenities = () => {
  const amenities = [
    "Free Wi-Fi",
    "24/7 Front Desk",
    "Swimming Pool",
    "Fitness Center",
    "Spa & Wellness Center",
    "Room Service",
    "Laundry Service",
    "Restaurant & Bar",
    "Conference Rooms",
    "Airport Shuttle",
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Our Amenities</h2>
        <div className="row">
          {amenities.map((amenity, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill h4 me-3 text-primary"></i>
                <p className="mb-0">{amenity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
