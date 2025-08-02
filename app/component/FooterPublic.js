import React from "react";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaPhone } from "react-icons/fa6";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_NUMBER,
  PRIVACY_POLICY,
  SITENAME,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_TWITTER,
  SUPPORT_URL,
  USES_POLICY,
  WHATSAPP_NUMBER,
} from "../config";

const FooterPublic = () => {
  return (
    <div
      className="container-fluid bg-dark text-light footer wow fadeIn"
      data-wow-delay="0.1s"
      style={{
        visibility: "visible",
        animationDelay: "0.1s",
        animationName: "fadeIn",
      }}
    >
      <div className="container pb-5">
        <div className="row g-5 pt-5">
          <div className="col-lg-4 col-md-6 p-2">
            <div className="base-gradient text-white rounded p-4">
              <Link href="/" className="text-decoration-none">
                <h1 className="text-dark bebas-neue-regular text-uppercase text-center mb-3">
                  {SITENAME}
                </h1>
              </Link>
              <p className="text-dark mb-0 text-justify text-small">
                Step into a world of knowledge, innovation, and opportunity at
                SSNEC. Our institution is committed to empowering students
                through quality education, industry-relevant training, and a
                supportive learning environment shaping future leaders and
                professionals ready to make a meaningful impact.
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 p-2 ">
            <h6 className="section-title text-start text-white border-bottom border-warning pb-2 text-uppercase mb-4">
              Contact
            </h6>
            <div className="ps-2">
              <p className="mb-2">
                <FaMapMarkerAlt className="me-3" />
                {CONTACT_ADDRESS}
              </p>
              <p className="mb-2">
                <a
                  href={"tel://" + CONTACT_NUMBER}
                  className="text-decoration-none text-white"
                >
                  <FaPhoneAlt className="me-3" />
                  {CONTACT_NUMBER}
                </a>
              </p>
              <p className="mb-2">
                <FaEnvelope className="me-3" />
                {CONTACT_EMAIL}
              </p>
              <div className="d-flex pt-2">
                <Link
                  className="btn btn-outline-light btn-social"
                  href={SOCIAL_TWITTER}
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
                <Link
                  className="btn btn-outline-light btn-social ms-1"
                  href={SOCIAL_FACEBOOK}
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  className="btn btn-outline-light btn-social ms-1"
                  href={SOCIAL_INSTAGRAM}
                  aria-label="instagram"
                >
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 p-2 ">
            <h6 className="section-title text-start text-white border-bottom border-warning pb-2 text-uppercase mb-4">
              Company
            </h6>
            <div>
              <Link href="/about-us" className="btn text-white">
                About Us
              </Link>
            </div>
            <div>
              <Link href="/contact-us" className="btn text-white">
                Contact Us
              </Link>
            </div>
            <div>
              <a
                href={PRIVACY_POLICY}
                target="_blank"
                className="btn text-white"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
            </div>
            <div>
              <a href={USES_POLICY} target="_blank" className="btn text-white" rel="noreferrer">
                Terms of use
              </a>
            </div>
            <div>
              <a href={SUPPORT_URL} target="_blank" className="btn text-white" rel="noreferrer">
                Support
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-9 p-2">
            <h6 className="section-title text-start text-white border-bottom border-warning pb-2 text-uppercase mb-4">
              Find us on map
            </h6>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3607.4547082578824!2d83.00048617538485!3d25.28892257765205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE3JzIwLjEiTiA4M8KwMDAnMTEuMCJF!5e0!3m2!1sen!2sin!4v1722074930181!5m2!1sen!2sin"
                width="100%"
                height="230px"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 10, left: 5, zIndex: 2 }}>
        <div className="p-2 bg-white rounded-circle border border-dark border-2">
          <a href={"https://wa.me/91" + WHATSAPP_NUMBER}>
            <IoLogoWhatsapp
              className="text-success "
              style={{ fontSize: 42 }}
            />
          </a>
        </div>
        <div className="p-3 bg-white rounded-circle mt-1  border border-dark border-2">
          <a href={"tel::" + CONTACT_NUMBER}>
            <FaPhone className="text-success " style={{ fontSize: 24 }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterPublic;
