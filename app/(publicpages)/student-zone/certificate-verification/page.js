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
            <h1 className="display-5 fw-bold">Certificate Verification</h1>
            <p className="lead text-muted">
              Verify the authenticity of issued certificates
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="card  bg-white shadow rounded border border-2">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="certificateNumber" className="form-label">
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="certificateNumber"
                      placeholder="Enter certificate number"
                    />
                  </div>
                  <button type="submit" className="btn base-gradient w-100">
                    Verify Certificate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Static Certificate Info Display (for dynamic usage later) */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card  bg-white shadow rounded border border-2">
              <div className="card-body">
                <h5 className="card-title">Certificate Details</h5>
                <div className="mb-2">
                  <strong>Certificate Number:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Student Name:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Course:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Issue Date:</strong>{" "}
                  <span className="text-muted">--</span>
                </div>
                <div className="mb-2">
                  <strong>Status:</strong>
                  <span className="badge bg-secondary ms-2">Pending</span>
                </div>
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
