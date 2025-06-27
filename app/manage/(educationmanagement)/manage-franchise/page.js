"use client";
import {
  API_PATH,
  LS_USERTOKEN,
  LS_USERID,
  LS_USERNAME,
  STATE_LIST,
} from "@/app/config";
import { fetchTableData } from "@/app/reusable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageFranchise() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "",
    password: "",
    verifyPassword: "",
  });

  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    fetchTableData({
      table: "userdata",
      where: "userrole='franchise'",
      orderby: "id desc",
      limit: "100",
    }).then((r) => setFranchises(r));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.verifyPassword)
      return alert("Passwords do not match.");

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addFranchise",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        username: localStorage.getItem(LS_USERNAME),
        name: form.name,
        email: form.email,
        contact: form.contact,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        status: form.status,
        password: form.password,
      })
      .then((r) => {
        if (r.data.status === "success") {
          fetchTableData({
            table: "userdata",
            where: "userrole='franchise'",
            orderby: "id desc",
            limit: "100",
          }).then((r) => setFranchises(r));
          setForm({
            name: "",
            email: "",
            contact: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            status: "",
            password: "",
            verifyPassword: "",
          });
        }
      });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Manage Franchise</h3>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Franchise Name</label>
          <input
            type="text"
            name="name"
            className="form-control bg-white"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control bg-white"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            name="contact"
            className="form-control bg-white"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control bg-white"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control bg-white"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">State</label>
          <select
            name="state"
            className="form-select bg-white"
            value={form.state}
            onChange={handleChange}
            required
          >
            <option value="">-- Select State --</option>
            {STATE_LIST.map((state, i) => (
              <option key={i} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Pincode</label>
          <input
            type="number"
            name="pincode"
            className="form-control bg-white"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select bg-white"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control bg-white"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Verify Password</label>
          <input
            type="password"
            name="verifyPassword"
            className="form-control bg-white"
            value={form.verifyPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-lable">Create Franchise</label>
          <div className="pt-2">
            <button type="submit" className="btn bg-warning text-dark">
              Add Franchise
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered table-white bg-white">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Status</th>
            <th>Date</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {franchises.length === 0 ? (
            <tr>
              <td colSpan="13" className="text-center">
                No franchises added yet.
              </td>
            </tr>
          ) : (
            franchises.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.address}</td>
                <td>{item.status}</td>
                <td>{item.date_added}</td>
                <td>{item.added_by_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
