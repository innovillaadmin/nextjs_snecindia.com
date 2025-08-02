"use client";
import React from "react";

import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .post(API_PATH + "ManageUser.php", {
        action: "getuserdatabyid",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        if (r.data.status === "success") {
          setUserData(r.data.retval);
        }
      });
  }, []);

  // Toggle editing mode
  const toggleEdit = () => {
    if (isEditing) {
      handleSubmit();
    }
    setIsEditing(!isEditing);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle form submission (update profile logic)
  const handleSubmit = () => {
    axios
      .post(API_PATH + "ManageUser.php", {
        action: "updateuserprofile",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        data: userData,
      })
      .then((r) => {
        if (r.data.status === "success") {
          alert("Profile Updated successfully!");
          window.scrollTo(0, 0);
        }
      });
  };

  return (
    <div className="container pb-5">
      <h2 className="mb-3 mt-5 mt-md-3">User Profile</h2>
      <form>
        <div className="row">
          {/* First Name */}
          <div className="form-group mb-3 col-md-3 p-1 col-md-3">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={userData.fname}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Middle Name */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Middle Name:</label>
            <input
              type="text"
              name="mname"
              value={userData.mname}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Last Name */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={userData.lname}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Email:</label>
            <input
              type="email"
              name="useremail"
              value={userData.useremail}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Contact */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Contact:</label>
            <input
              type="text"
              name="usercontact"
              value={userData.usercontact}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Gender */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Gender:</label>
            <select
              name="gender"
              value={userData.gender}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Is Business */}
          <div className="form-group mb-3 col-md-12 p-1">
            <label>Is Business User (Check here): </label>
            <input
              type="checkbox"
              name="is_business"
              checked={userData.is_business}
              disabled={!isEditing}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  is_business: e.target.checked,
                })
              }
              className="ms-1 form-check-input bg-warning border border-dark"
            />
          </div>

          {/* Business Fields */}
          {userData.is_business && (
            <>
              <div className="form-group mb-3 col-md-3 p-1">
                <label>Business Name:</label>
                <input
                  type="text"
                  name="business_name"
                  value={userData.business_name}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="form-control shadow"
                />
              </div>
              <div className="form-group mb-3 col-md-3 p-1">
                <label>GST Number:</label>
                <input
                  type="text"
                  name="gst_number"
                  value={userData.gst_number}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="form-control shadow"
                />
              </div>
            </>
          )}

          {/* Address */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* City */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* State */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={userData.state}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* Pincode */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={userData.pincode}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* ID Type 1 and Number */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>ID Type 1:</label>
            <input
              type="text"
              name="id_type"
              value={userData.id_type}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>
          <div className="form-group mb-3 col-md-3 p-1">
            <label>ID Number 1:</label>
            <input
              type="text"
              name="id_number"
              value={userData.id_number}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>

          {/* ID Type 2 and Number */}
          <div className="form-group mb-3 col-md-3 p-1">
            <label>ID Type 2:</label>
            <input
              type="text"
              name="id2_type"
              value={userData.id2_type}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>
          <div className="form-group mb-3 col-md-3 p-1">
            <label>ID Number 2:</label>
            <input
              type="text"
              name="id2_number"
              value={userData.id2_number}
              disabled={!isEditing}
              onChange={handleChange}
              className="form-control shadow"
            />
          </div>
          <div className="form-group mb-3 col-md-3 p-1">
            <label>Click here to update</label>
            <button
              type="button"
              className="form-control btn btn-warning shadow"
              onClick={toggleEdit}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

          {/* Edit/Save Button */}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
