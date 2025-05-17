"use client";
import { API_PATH, LS_USERID } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PasswordReset = () => {
  const [password, setpassword] = useState("");
  const [verifypassword, setverifypassword] = useState("");

  // alert states
  const [alert, setalert] = useState("");
  const [alertclass, setalertclass] = useState("");

  // logic to change password
  const changepassword = (e) => {
    e.preventDefault();
    if (!password || !verifypassword || password !== verifypassword) {
      setalertclass("alert alert-danger");
      setalert(
        "Something went wrong with the password. Please check and verify whether both fields are filled and correct."
      );
      setTimeout(() => {
        setalertclass("");
        setalert("");
      }, 4000);
    } else {
      axios
        .post(API_PATH + "Auth.php", {
          action: "resetpassword",
          userid: localStorage.getItem(LS_USERID),
          newpass: password,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setalertclass("alert alert-success");
            setalert(
              "Password change successful, redirecting to product showcase in 5 seconds."
            );
            setpassword("");
            setverifypassword("");
            setTimeout(() => {
              router.push("/store");
            }, 5000);
          } else {
            setalertclass("alert alert-danger");
            setalert("Something went wrong, please try again later !");
          }
          setTimeout(() => {
            setalertclass("");
            setalert("");
          }, 4000);
        });
    }
  };

  return (
    <div className="mh-90">
      <div className="mt-3 container">
        <div className="row m-0">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {alert && <div className={alertclass}>{alert}</div>}
            <div className="alert alert-danger">
              Re-setting password on first login is advised for users safety.{" "}
              Please change your password, if not already changed.
            </div>
            <div className="bg-white shadow rounded p-2">
              <h4>Reset Password</h4>
              <div className="base-gradient p-1 rounded"></div>
              <div className="mt-3">
                <form onSubmit={changepassword}>
                  <div>
                    <label htmlFor="password">Enter Password</label>
                    <input
                      type="text"
                      id="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label htmlFor="verifypassword">Verify Password</label>
                    <input
                      type="text"
                      id="verifypassword"
                      value={verifypassword}
                      onChange={(e) => setverifypassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <button className="btn base-gradient mt-3 text-white">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
