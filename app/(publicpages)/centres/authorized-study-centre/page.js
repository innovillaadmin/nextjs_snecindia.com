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
            <h1 className="display-5 fw-bold">Authorized Study Centres</h1>
            <p className="lead text-muted">
              Explore the list of recognized study centres operating under SSNEC
              guidelines.
            </p>
          </div>
        </div>

        {/* Study Centres Table */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card bg-white rounded shadow border border-2">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Study Centre Name</th>
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
                        <td>SSNEC Study Centre - North Zone</td>
                        <td>Delhi</td>
                        <td>Mr. Ramesh Kumar</td>
                        <td>+91 9012345678</td>
                        <td>northzone@ssnec.org</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>SSNEC Study Centre - East Zone</td>
                        <td>Kolkata, West Bengal</td>
                        <td>Ms. Priya Saha</td>
                        <td>+91 9988776655</td>
                        <td>eastzone@ssnec.org</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>SSNEC Study Centre - South Zone</td>
                        <td>Chennai, Tamil Nadu</td>
                        <td>Dr. Arvind Rao</td>
                        <td>+91 9876543210</td>
                        <td>southzone@ssnec.org</td>
                        <td>
                          <span className="badge bg-success">Authorized</span>
                        </td>
                      </tr>
                      {/* More entries can be added dynamically */}
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
