"use client";

import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import React, { useState } from "react";

const initialState = {
  fname: "",
  mname: "",
  lname: "",
  useremail: "",
  usercontact: "",
  usergender: "",
  address: "",
  userrole: "customer",
  password: "",
  isbusiness: "n",
  bname: "",
  gstnum: "",
  city: "",
  userstate: "",
  pincode: "",
};

const AddUserPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { usercontact, useremail, password, userrole } = formData;

    if (!usercontact || !useremail || !password || !userrole) {
      setAlertClass("alert alert-danger");
      setAlert(
        "Fields marked in red border are mandatory to add user, please check and validate."
      );
      setTimeout(() => {
        setAlertClass("");
        setAlert("");
      }, 4000);
      return;
    }

    axios
      .post(API_PATH + "ManageUser.php", {
        action: "addnewusertodata",
        usertoken: localStorage.getItem(LS_USERTOKEN),
        userid: localStorage.getItem(LS_USERID),
        ...formData,
      })
      .then((response) => {
        const { status, err } = response.data;

        if (status === "success") {
          setAlert("User added successfully.");
          setAlertClass("alert alert-success");
          setFormData(initialState);
        } else {
          const errorMsg =
            status === "failed" && err === "multi"
              ? "User with same contact or email address already added in system. Please try with different details."
              : "Something went wrong, please try again.";
          setAlert(errorMsg);
          setAlertClass("alert alert-danger");
        }
        setTimeout(() => {
          setAlert("");
          setAlertClass("");
        }, 4000);
      });
  };

  const { isbusiness, userstate, userrole, password } = formData;

  return (
    <div className="mh-90">
      <div className="container mt-5 mb-5">
        {alert && <div className={alertClass}>{alert}</div>}
        <div className="rounded p-2 bg-white shadow border">
          <h6 className="text-base">Add a New User</h6>
          <div className="p-1 base-gradient rounded border border-dark"></div>
          <form onSubmit={handleSubmit}>
            <div className="row m-0 mt-2">
              {["fname", "mname", "lname"].map((field, index) => (
                <div key={index} className="mt-1 col-md-3">
                  <label htmlFor={field}>
                    Name{" "}
                    {index === 0 ? "First" : index === 1 ? "Middle" : "Last"}
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              ))}
              {["useremail", "usercontact"].map((field, index) => (
                <div key={index} className="mt-1 col-md-3">
                  <label htmlFor={field}>
                    {field
                      .replace("user", "")
                      .replace(/([A-Z])/g, " $1")
                      .toUpperCase()}
                  </label>
                  <input
                    type={field === "useremail" ? "email" : "number"}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`form-control ${
                      field === "usercontact" ? "border border-danger" : ""
                    }`}
                  />
                </div>
              ))}
              <div className="mt-1 col-md-3">
                <label htmlFor="usergender">Gender</label>
                <select
                  className="form-control"
                  id="usergender"
                  value={formData.usergender}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-1 col-md-3">
                <label htmlFor="businessuser">Is Business</label>
                <select
                  className="form-control"
                  id="isbusiness"
                  value={formData.isbusiness}
                  onChange={handleChange}
                >
                  <option value="y">Yes</option>
                  <option value="n">No</option>
                </select>
              </div>
              {formData.isbusiness === "y" && (
                <>
                  <div className="mt-1 col-md-3">
                    <label htmlFor="bname">Business Name</label>
                    <input
                      type="text"
                      id="bname"
                      value={formData.bname}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1 col-md-3">
                    <label htmlFor="gstnum">GST Number</label>
                    <input
                      type="text"
                      id="gstnum"
                      value={formData.gstnum}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </>
              )}
              <div className="mt-1 col-md-6">
                <label htmlFor="address">Complete Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {["city", "userstate", "pincode"].map((field, index) => (
                <div
                  key={index}
                  className={`mt-1 ${
                    field === "userstate" ? "col-md-3" : "col-md-3"
                  }`}
                >
                  <label htmlFor={field}>
                    {field
                      .replace("user", "")
                      .replace(/([A-Z])/g, " $1")
                      .toUpperCase()}
                  </label>
                  {field === "userstate" ? (
                    <select
                      className="form-control"
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                    >
                      <option value="">Select from list</option>
                      <option value="andhra pradesh">Andhra Pradesh</option>
                      {/* Add other states here */}
                    </select>
                  ) : (
                    <input
                      type={field === "pincode" ? "number" : "text"}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  )}
                </div>
              ))}
              <div className="mt-1 col-md-3">
                <label htmlFor="userrole">User Profile</label>
                <select
                  className="form-control border border-danger"
                  id="userrole"
                  value={formData.userrole}
                  onChange={handleChange}
                >
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="mt-1 col-md-3">
                <label htmlFor="password">User Password</label>
                <input
                  type="text"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control border border-danger"
                />
              </div>
              <div className="mt-1 col-md-3">
                <label htmlFor="submit">Click to add user</label>
                <button
                  type="submit"
                  id="submit"
                  className="form-control base-gradient text-dark border border-dark"
                >
                  Add User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
