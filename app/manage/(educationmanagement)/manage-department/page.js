"use client";
import { API_PATH, LS_USERID, LS_USERNAME, LS_USERTOKEN } from "@/app/config";
import { fetchTableData } from "@/app/reusable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AddDepartment() {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");

  useEffect(() => {
    fetchTableData({
      table: "departments",
      where: "id>0",
      orderby: "id desc",
      limit: "100",
    }).then((r) => setDepartments(r));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deptName.trim()) return;

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addDepartment",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        username: localStorage.getItem(LS_USERNAME),
        deptName,
        deptCode,
      })
      .then((r) => {
        if (r.data.status === "success") {
          fetchDepartments().then((r) => setDepartments(r));
          setDeptName("");
          setDeptCode("");
        } else {
          alert("Something went wrong, try again later!");
        }
      });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Add Department</h3>
      <form className="row g-3 align-items-center mb-4" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <label htmlFor="deptCode" className="col-form-label">
            Dep. Code
          </label>
          <input
            type="text"
            className="form-control bg-light"
            id="deptCode"
            value={deptCode}
            onChange={(e) => setDeptCode(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="deptName" className="col-form-label">
            Dep. Name
          </label>
          <input
            type="text"
            className="form-control bg-light"
            id="deptName"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <label htmlFor="deptName" className="col-form-label">
            Dep. Name
          </label>
          <div>
            <button type="submit" className="btn bg-warning text-dark">
              Add Department
            </button>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Date</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No departments added yet.
                </td>
              </tr>
            ) : (
              departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.id}</td>
                  <td>{dept.code}</td>
                  <td>{dept.name}</td>
                  <td>{dept.date}</td>
                  <td>{dept.added_by_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
