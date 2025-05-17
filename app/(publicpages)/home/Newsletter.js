"use client";
import { API_PATH } from "@/app/config";
import axios from "axios";
import React, { useCallback, useState } from "react";

const Newsletter = () => {
  const [email, setemail] = useState();
  const handlesubscription = useCallback(() => {
    if (!email) {
      alert("Email address is required to subscribe!" + email);
    } else {
      if (localStorage.getItem("subscription-status") === "subscribed") {
        alert("Already subscribed! No action needed!");
      } else {
        axios
          .post(API_PATH + "ManageHotel.php", {
            action: "subscribemailinglist",
            email,
          })
          .then((r) => {
            if (r.data.status === "success") {
              localStorage.setItem("subscription-status", "subscribed");
              alert("Email address added to list.");
              setemail("");
            } else {
              if (e.data.err === "multi") {
                alert("Already subscribed! No action needed!");
              }
            }
          });
      }
    }
  }, []);
  return (
    <div>
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-10 border border-secondary shadow bg-warning rounded p-1">
            <div className="border border-secondary bg-white shadow rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Subscribe Our{" "}
                  <span className="text-dark text-uppercase">Newsletter</span>
                </h4>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <input
                    className="form-control w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn base-gradient text-dark py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                    onClick={handlesubscription}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
