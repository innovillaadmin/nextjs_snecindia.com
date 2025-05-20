import FooterPublic from "@/app/component/FooterPublic";
import Partition from "@/app/component/Partition";
import React from "react";

const page = () => {
  return (
    <div>
      <Partition />
      <div className="container py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">New Franchise Enquiry</h1>
            <p className="lead text-muted">
              Fill out the form below to express your interest or ask questions
              about becoming an SSNEC franchise partner.
            </p>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-white rounded border border-2 shadow">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailAddress"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Your city"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Your state"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Your Message / Query
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows={4}
                      placeholder="Write your enquiry here"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn base-gradient w-100">
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <FooterPublic />
      </div>
    </div>
  );
};

export default page;
