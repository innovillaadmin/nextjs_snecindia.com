"use client";
import { API_PATH, LS_USERID, LS_USERNAME, LS_USERTOKEN } from "@/app/config";
import { fetchCourses, fetchTableData } from "@/app/reusable";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Courses() {
  const [departments, setDepartments] = useState([]); // Example options
  const [selectedDept, setSelectedDept] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [duration, setDuration] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchTableData({
      table: "departments",
      where: "id>0",
      orderby: "id desc",
      limit: 100,
    }).then((r) => setDepartments(r));

    fetchCourses().then((r) => setCourses(r));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedDept ||
      !courseName.trim() ||
      !duration.trim() ||
      !eligibility.trim()
    ) {
      alert("All fields are mandatory.");
      return;
    }

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addCourse",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        username: localStorage.getItem(LS_USERNAME),
        selectedDept,
        courseCode,
        eligibility,
        duration,
        courseName,
      })
      .then((r) => {
        if (r.data.status === "success") {
          fetchCourses().then((r) => setCourses(r));
          setSelectedDept("");
          setCourseCode("");
          setEligibility("");
          setDuration("");
          setCourseName("");
        }
      });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Add Course</h3>

      <form className="row g-3 align-items-center mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label htmlFor="department" className="form-label">
            Select Department
          </label>
          <select
            id="department"
            className="form-select bg-white"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            required
          >
            <option value="">-- Choose --</option>
            {departments.map((dept, id) => (
              <option key={id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="courseName" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            className="form-control bg-white"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="courseName" className="form-label">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            className="form-control bg-white"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="department" className="form-label">
            Course Duration
          </label>
          <select
            id="department"
            className="form-select bg-white"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="">-- Choose --</option>
            <option value="3-months">3-months</option>
            <option value="6-months">6-months</option>
            <option value="9-months">9-months</option>
            <option value="12-months">12-months</option>
            <option value="15-months">15-months</option>
            <option value="18-months">18-months</option>
            <option value="21-months">21-months</option>
            <option value="2-years">2-years</option>
            <option value="2.5-years">2.5-years</option>
            <option value="3-years">3-years</option>
            <option value="3.5-years">3.5-years</option>
            <option value="4-years">4-years</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="department" className="form-label">
            Course Eligibility
          </label>
          <select
            id="department"
            className="form-select bg-white"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            required
          >
            <option value="">-- Choose --</option>
            <option value="class-8">Class 8th</option>
            <option value="class-10">Class 10th</option>
            <option value="class-10-12">Class 10/12th</option>
            <option value="class-12">Class 12th</option>
            <option value="any-diploma">Any Diploma</option>
            <option value="any-graduation">Any Graduation</option>
            <option value="post-graduation">Any Post Graduation</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="department" className="form-label">
            Submit form
          </label>
          <div>
            <button type="submit" className="btn bg-warning text-dark w-100">
              Add Course
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-bordered table-white bg-white">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Department</th>
            <th>Course</th>
            <th>Course Code</th>
            <th>Duration</th>
            <th>Eligibility</th>
            <th>Added By</th>
            <th>TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No courses added yet.
              </td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr key={index}>
                <td>{course.id}</td>
                <td>{course.department_name}</td>
                <td>{course.name}</td>
                <td>{course.course_code}</td>
                <td>{course.duration}</td>
                <td>{course.eligibility}</td>
                <td>{course.added_by}</td>
                <td>{course.date && course.date + " : " + course.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
