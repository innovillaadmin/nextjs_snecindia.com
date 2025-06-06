"use client";
import FooterPublic from "@/app/component/FooterPublic";
import Partition from "@/app/component/Partition";
import { API_PATH } from "@/app/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [fl, setfl] = useState([]);
  useEffect(() => {
    axios
      .post(API_PATH + "PublicRequests.php", {
        action: "getActiveFranchiseList",
      })
      .then((r) => {
        if (r.data.status === "success") {
          setfl(r.data.retval);
        }
      });
  }, []);
  return (
    <div>
      <Partition />
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold">Authorized Franchise List</h1>
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
                        {/* <th>Coordinator</th> */}
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fl &&
                        fl.map((d, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{d.fname}</td>
                              <td>{d.address}</td>
                              <td>{d.contact}</td>
                              <td>{d.email}</td>
                              <td>{d.status}</td>
                            </tr>
                          );
                        })}
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
