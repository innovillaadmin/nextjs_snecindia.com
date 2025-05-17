"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [limit, setlimit] = useState(100);
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getemailrequests",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        limit,
      })
      .then((r) => {
        r.data.status === "success" ? setdata(r.data.retval) : setdata([]);
      });
  }, [limit]);

  return (
    <div className="mh-90">
      <div className="container">
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <h6 className="text-bold p-2">Email Subscribers</h6>
          </div>
          <div>
            Number of records to view
            <input
              type="number"
              className="form-control bg-light shadow"
              value={limit}
              onChange={(e) => setlimit(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 border-top border-warning border-2 overflow-x-scroll">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Id.</th>
                <th>Email Address</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.email}</td>
                    <td>{d.date}</td>
                    <td>{d.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
