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
            <h1 className="display-5 fw-bold">Authorized Franchise List</h1>
            <p className="lead text-muted">
              Below is the list of officially authorized SSNEC franchises across
              various regions.
            </p>
          </div>
        </div>

        {/* Franchise Table */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Franchise Name</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Bright Future Institute</td>
                        <td>Patna, Bihar</td>
                        <td>+91 9876543210</td>
                        <td>brightfuture@example.com</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Sunrise Education Center</td>
                        <td>Lucknow, Uttar Pradesh</td>
                        <td>+91 9123456780</td>
                        <td>sunriseedu@example.com</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Career Path Academy</td>
                        <td>Ranchi, Jharkhand</td>
                        <td>+91 9988776655</td>
                        <td>careerpath@example.com</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      {/* More entries can be dynamically added here */}
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
