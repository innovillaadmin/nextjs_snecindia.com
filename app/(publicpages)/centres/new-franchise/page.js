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
            <h1 className="display-5 fw-bold">New Franchises</h1>
            <p className="lead text-muted">
              Below is the list of newly registered and upcoming SSNEC franchise
              centres across India.
            </p>
          </div>
        </div>

        {/* New Franchise Table */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Franchise Name</th>
                        <th>Location</th>
                        <th>Coordinator</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Future Skills Academy</td>
                        <td>Indore, Madhya Pradesh</td>
                        <td>Mr. Ajay Mehta</td>
                        <td>+91 9090909090</td>
                        <td>futureskills@ssnec.org</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            Pending Verification
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Smart Learning Hub</td>
                        <td>Jaipur, Rajasthan</td>
                        <td>Ms. Sunita Sharma</td>
                        <td>+91 9123456789</td>
                        <td>smartlearning@ssnec.org</td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Career Builders Institute</td>
                        <td>Guwahati, Assam</td>
                        <td>Mr. Nikhil Das</td>
                        <td>+91 9876543211</td>
                        <td>careerbuilders@ssnec.org</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            Under Review
                          </span>
                        </td>
                      </tr>
                      {/* Additional entries can be dynamically rendered */}
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
