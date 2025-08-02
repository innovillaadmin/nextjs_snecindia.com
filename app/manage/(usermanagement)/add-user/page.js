"use client";
import React from "react";
import { useState, useCallback } from "react";
import axios from "axios";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    useremail: "",
    usercontact: "",
    gender: "",
    is_business: false,
    business_name: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    userrole: "",
    password: "",
    id_type: "",
    id_number: "",
    id2_type: "",
    id2_number: "",
    id3_type: "",
    id3_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post("/api/createUser", formData);
        console.log("User created successfully:", response.data);
      } catch (error) {
        console.error("Error creating user:", error);
        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="container pt-2 base-gradient shadow mt-3 p-0">
      <div className="px-md-5 bg-white py-md-3 border  mb-5">
        <h2>Create User Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control shadow "
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Middle Name</label>
              <input
                type="text"
                className="form-control shadow "
                name="mname"
                value={formData.mname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control shadow "
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control shadow "
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control shadow "
                name="usercontact"
                value={formData.usercontact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <select
                className="form-select  shadow"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12 d-flex justify-content-center pt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input  bg-danger text-dark shadow"
                  name="is_business"
                  checked={formData.is_business}
                  onChange={handleChange}
                />
                <label className="form-check-label ms-2">
                  Click here If Business Account
                </label>
              </div>
            </div>
          </div>

          {formData.is_business && (
            <>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    className="form-control shadow "
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">GST Number</label>
                  <input
                    type="text"
                    className="form-control shadow "
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control shadow "
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control shadow "
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control shadow "
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control shadow "
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">User Role</label>
              <input
                type="text"
                className="form-control shadow "
                name="userrole"
                value={formData.userrole}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control shadow "
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">ID Type</label>
              <input
                type="text"
                className="form-control shadow "
                name="id_type"
                value={formData.id_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ID Number</label>
              <input
                type="text"
                className="form-control shadow "
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ID2 Type</label>
              <input
                type="text"
                className="form-control shadow "
                name="id2_type"
                value={formData.id2_type}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">ID2 Number</label>
              <input
                type="text"
                className="form-control shadow "
                name="id2_number"
                value={formData.id2_number}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ID3 Type</label>
              <input
                type="text"
                className="form-control shadow "
                name="id3_type"
                value={formData.id3_type}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">ID3 Number</label>
              <input
                type="text"
                className="form-control shadow "
                name="id3_number"
                value={formData.id3_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3"></div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn base-gradient border text-dark "
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
