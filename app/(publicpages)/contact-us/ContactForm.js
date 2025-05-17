"use client";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { MdFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import {
  API_PATH,
  SELLIO_PROFILE,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_TWITTER,
} from "@/app/config";
import axios from "axios";

const ContactForm = () => {
  const [fullname, setfullname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [purpose, setpurpose] = useState("");

  const handlesubmitrequest = useCallback(() => {
    if (fullname && contact && email) {
      axios
        .post(API_PATH + "ManageHotel.php", {
          action: "submitcontactrequest",
          fullname,
          contact,
          email,
          purpose,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setfullname("");
            setcontact("");
            setemail("");
            setpurpose("");
            alert(
              "We've received your request, and our team will contact soon."
            );
          } else {
            if (r.data.err === "multi") {
              ("We already have your contact detail, our team will get back to you very soon.");
            }
          }
        });
    } else {
      alert("Name,  contact number and email is mandatory!");
    }
  }, [fullname, contact, email, purpose]);

  return (
    <div>
      <div className="w-100 py-5">
        <div className="container">
          <div className="row m-0 align-items-center">
            <div className="col-lg-6 mt-0">
              <h1
                className="mb-4 text-dark text-uppercase bebas-neue-regular"
                style={{ fontSize: 45 }}
              >
                Experience Ultimate and easy three options to contact us.
              </h1>
              <p className="mb-4">
                Experience the ultimate in convenience with three simple and
                hassle-free ways to get in touch with us, ensuring you receive
                the assistance and information you need swiftly and
                effortlessly.
              </p>
              <div className="row g-3 pb-4">
                <div className="col-sm-4" data-bs-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center border-warning p-1">
                      <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1 fs-4" data-toggle="counter-up">
                        WhatsApp Connect
                      </h2>
                      <p className="mb-0">Bottom Left</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4" data-bs-wow-delay="0.3s">
                  <div className="border rounded p-1 shadow">
                    <div className="border rounded text-center border-warning p-1 py-md-3">
                      <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1 fs-4" data-toggle="counter-up">
                        Call Button
                      </h2>
                      <p className="mb-0">Bottom Left</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4" data-bs-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center border-warning py-md-3">
                      <i className="fa fa-users fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1 fs-4" data-toggle="counter-up">
                        Contact Form
                      </h2>
                      <p className="mb-0">Contact Page</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <Link href={SOCIAL_FACEBOOK}>
                    <button
                      type="submit"
                      className="btn base-gradient text-dark rounded-pill px-3 border-dark border-2 "
                    >
                      <MdFacebook className="m-0 p-0 fs-4" /> Facebook
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href={SOCIAL_INSTAGRAM}>
                    <button
                      type="submit"
                      className="btn base-gradient text-dark rounded-pill px-3 border-dark border-2"
                    >
                      <RiInstagramFill className="fs-4" /> Instagram
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href={SOCIAL_TWITTER}>
                    <button
                      type="submit"
                      className="btn base-gradient text-dark rounded-pill px-3 border-dark border-2"
                    >
                      <AiFillTwitterCircle className="fs-4" /> Twitter
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href={SELLIO_PROFILE}>
                    <button
                      type="submit"
                      className="btn base-gradient text-dark rounded-pill px-3 border-dark border-2"
                    >
                      <span className="bg-dark rounded-circle p-0 m-0 ps-2 pe-1 text-warning text- ">
                        s
                      </span>{" "}
                      Sellio
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 ">
              <h5 className="fs-3 mt-3 bebas-neue-regular">Contact Form</h5>
              <div className="">
                <label htmlFor="Customer_Name">Your Full Name</label>
                <div
                  id="Customer_Name"
                  className="shadow rounded bg-warning pt-1"
                >
                  <div className="bg-white rounded p-2 border">
                    <div>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <label htmlFor="Contact_Number">
                  Contact Number (With Country Code)
                </label>
                <div
                  id="Contact_Number"
                  className="shadow rounded bg-warning pt-1"
                >
                  <div className="bg-white rounded p-2 border">
                    <div>
                      <input
                        type="number"
                        min={0}
                        className="form-control bg-light"
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <label htmlFor="Contact_Number">Email Address</label>
                <div
                  id="Contact_Number"
                  className="shadow rounded bg-warning pt-1"
                >
                  <div className="bg-white rounded p-2 border">
                    <div>
                      <input
                        type="email"
                        min={0}
                        className="form-control bg-light"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <label htmlFor="Contact_Number">Query/Purpose</label>
                <div
                  id="Contact_Number"
                  className="shadow rounded bg-warning pt-1"
                >
                  <div className="bg-white rounded p-2 border">
                    <div>
                      <textarea
                        className="form-control bg-light"
                        value={purpose}
                        onChange={(e) => setpurpose(e.target.value)}
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-end mt-3">
                <button
                  type="submit"
                  className="btn base-gradient text-dark rounded-pill px-4  border-2"
                  onClick={handlesubmitrequest}
                >
                  Submit Request
                </button>
              </div>

              <div className="row g-3"></div>
            </div>
          </div>
          <div className="mt-5 shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14429.832359321297!2d83.0030362!3d25.2888089!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e31de9fd5f027%3A0x36a3b4bc14c9f9c0!2sMishra%20Ganesh%20Shankar%20Homestay%20guest%20house%20Varanasi!5e0!3m2!1sen!2sin!4v1722885050909!5m2!1sen!2sin"
              width="100%"
              height="450"
              className="rounded"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="text-center" style={{ marginTop: 90 }}>
            <h1
              className="mb-4 text-dark text-uppercase bebas-neue-regular"
              style={{ fontSize: 35 }}
            >
              Stay Ahead with Our Exclusive Newsletter Subscription!
            </h1>
            <p>
              Subscribe to our newsletter and be the first to know about the
              latest updates, exclusive offers, and exciting news. Never miss
              out on important announcements and special promotions tailored
              just for you. Join our community today and stay connected with
              everything that matters!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
