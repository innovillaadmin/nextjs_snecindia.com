"use client";
import { API_PATH, LS_USERID, LS_USERNAME, LS_USERTOKEN } from "@/app/config";
import { fetchCourses, fetchTableData } from "@/app/reusable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AddSubjects() {
  // Sample static data – replace with dynamic API data if needed

  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [coursesByDepartment, setCourseByDepartment] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTableData({
      table: "departments",
      where: "id>0",
      orderby: "id desc",
      limit: "100",
    }).then((r) => setDepartmentList(r));

    fetchTableData({
      table: "subjects",
      where: "id>0",
      orderby: "id desc",
      limit: "100",
    }).then((r) => setSubjects(r));
  }, []);

  const fetchCourseByDepartment = (e) => {
    setSelectedDepartment(e.target.value);
    setCourseByDepartment([]);
    fetchTableData({
      table: "courses",
      where: "department_id='" + e.target.value + "'",
      orderby: "id desc",
      limit: "100",
    }).then((r) => setCourseByDepartment(r));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedCourse || !subjectName.trim()) return;

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addSubject",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        username: localStorage.getItem(LS_USERNAME),
        selectedDepartment,
        selectedCourse,
        subjectName,
      })
      .then((r) => {
        if (r.data.status === "success") {
          fetchTableData({
            table: "subjects",
            where: "id>0",
            orderby: "id desc",
            limit: "100",
          }).then((r) => setSubjects(r));
          setSubjects("");
          setSelectedDepartment("");
          setSelectedCourse("");
          setSubjectName("");
        } else {
          alert("Something went wrong, please try again later.");
        }
      });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Add Subject to Courses</h3>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="department" className="form-label">
            Select Department
          </label>
          <select
            id="department"
            className="form-select bg-light"
            value={selectedDepartment}
            onChange={fetchCourseByDepartment}
            required
          >
            <option value="">-- Choose --</option>
            {departmentList.map((d, i) => (
              <option key={i} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="course" className="form-label">
            Select Course
          </label>
          <select
            id="course"
            className="form-select bg-light"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            disabled={coursesByDepartment ? false : true}
          >
            <option value="">-- Choose --</option>
            {coursesByDepartment &&
              coursesByDepartment.map((d, i) => (
                <option key={i} value={d.id}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="subjectName" className="form-label">
            Add Subject
          </label>
          <input
            type="text"
            id="subjectName"
            className="form-control bg-light"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn bg-warning text-dark">
            Add
          </button>
        </div>
      </form>

      <table className="table table-striped table-bordered table-white bg-white">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Subject Name</th>
            <th>Course Name</th>
            <th>Department Name</th>
            <th>Added By</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No subjects added yet.
              </td>
            </tr>
          ) : (
            subjects.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.subject_name}</td>
                <td>{d.course_name}</td>
                <td>{d.department_name}</td>
                <td>{d.added_by_name}</td>
                <td>{d.date}</td>
                <td>{d.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
