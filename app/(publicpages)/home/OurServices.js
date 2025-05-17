import React from "react";
import { FaMedal } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa6";
import { MdNetworkWifi } from "react-icons/md";
import { SiHelpdesk } from "react-icons/si";
import { GiHolyOak } from "react-icons/gi";
import { SiHtmlacademy } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";

const OurServices = () => {
  return (
    <div>
      <div className="container pt-5 pb-5 mt-5 mb-5">
        <div className="text-center" data-wow-delay="0.1s">
          <h1 className="mb-5 bebas-neue-regular">Explore Our Facilities</h1>
        </div>
        <div className="row m-0">
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark rounded p-3">
                    <FaMedal className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Recognized Certifications
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Students receive certifications that hold value nationwide,
                enhancing employability and career advancement opportunities.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark rounded p-3">
                    <FaHandsHelping className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Supportive Staff
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Experience personalized support from dedicated faculty and
                administrative staff committed to helping you thrive
                academically and personally.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark rounded p-3">
                    <FaIndustry className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Industry-Relevant Curriculum
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Courses are designed in collaboration with industry experts to
                meet current market demands and prepare students for real-world
                .
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark rounded p-3">
                    <MdNetworkWifi className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Campus-wide WiFi
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Stay connected with seamless, high-speed internet available
                across the campus for uninterrupted learning and collaboration.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark rounded p-3">
                    <SiHelpdesk className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Student Help Desk
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Assistance with academic counseling, extracurricular planning,
                and local guidance to help students settle and succeed.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark  rounded p-3">
                    <GiHolyOak className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Holistic Development
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                Our programs are designed to nurture both academic and personal
                growth, encouraging students to reach their full potential.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark  rounded p-3">
                    <SiHtmlacademy className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Academic Excellence
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                A strong focus on quality education, guided by experienced
                faculty and a well-structured curriculum tailored to industry
                needs.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark  rounded p-3">
                    <PiStudentFill className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Student-Centered Approach
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                We prioritize individual growth through mentorship, personalized
                guidance, and continuous academic support.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-2 p-1">
            <div className="shadow rounded border p-2 text-center ">
              <div className="mt-4">
                <span className="p-2 py-4 border rounded base-gradient">
                  <span className=" border border-dark  rounded p-3">
                    <FaBookReader className="fs-1" />
                  </span>
                </span>
              </div>
              <h5 className="mt-4 mb-2 text-dark text-bold text-center">
                Government-Approved Courses
              </h5>
              <p className="text-body mb-0 text-center pb-4">
                All programs are recognized and approved by relevant government
                bodies, ensuring credibility and industry acceptance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
