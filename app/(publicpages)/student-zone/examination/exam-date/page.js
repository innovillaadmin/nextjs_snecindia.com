import FooterPublic from "@/app/component/FooterPublic";
import Partition from "@/app/component/Partition";
import React from "react";

const page = () => {
  return (
    <div>
      <Partition />
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">Examination Time Table</h1>
            <p className="lead text-muted">
              View the scheduled dates for upcoming examinations
            </p>
          </div>
        </div>

        {/* Course Selection Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="card bg-white shadow rounded border-2">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="courseSelect" className="form-label">
                      Select Course
                    </label>
                    <select className="form-select" id="courseSelect">
                      <option defaultValue>Select your course</option>
                      <option value="paramedical">Paramedical</option>
                      <option value="nursing">Nursing</option>
                      <option value="computer">Computer</option>
                      <option value="veterinary">Veterinary Science</option>
                      <option value="yoga">Yoga</option>
                    </select>
                  </div>
                  <button type="submit" className="btn base-gradient w-100">
                    Get Time Table
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Static Time Table Display */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card bg-white shadow rounded border-2">
              <div className="card-body">
                <h5 className="card-title mb-4">Time Table</h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Course</th>
                        <th>Exam Center</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-06-10</td>
                        <td>10:00 AM - 01:00 PM</td>
                        <td>Human Anatomy</td>
                        <td>Paramedical</td>
                        <td>Center A</td>
                      </tr>
                      <tr>
                        <td>2025-06-12</td>
                        <td>10:00 AM - 01:00 PM</td>
                        <td>Pharmacology</td>
                        <td>Paramedical</td>
                        <td>Center A</td>
                      </tr>
                      <tr>
                        <td>2025-06-14</td>
                        <td>02:00 PM - 05:00 PM</td>
                        <td>Medical Ethics</td>
                        <td>Paramedical</td>
                        <td>Center A</td>
                      </tr>
                      {/* Additional rows can be added dynamically */}
                    </tbody>
                  </table>
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
