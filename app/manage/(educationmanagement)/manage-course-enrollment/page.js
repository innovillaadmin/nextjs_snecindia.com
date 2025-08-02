"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export default function ManageCourseEnrollment() {
  const [searchkey, setsearchkey] = useState("");
  const [students, setstudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [session, setsession] = useState("");
  const [studentname, setstudentname] = useState("");
  const [rollnumber, setrollnumber] = useState("");
  const [departmentlist, setdepartmentslist] = useState([]);
  const [courselist, setcourselist] = useState([]);

  const [form, setForm] = useState({
    department: "",
    course: "",
    semester: "",
    enrollmentnumber: "",
  });

  const fetchCoursesByDepartment = useCallback((depid) => {
    if (!depid) {
      setcourselist([]);
      return;
    }

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchCoursesByDepartment",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        depid,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setcourselist(r.data.retval);
        } else {
          setcourselist([]);
        }
      })
      .catch(() => setcourselist([]));
  }, []);

  const fetchDepartments = useCallback(() => {
    axios
      .post(API_PATH + "PublicRequests.php", {
        action: "fetchDepartments",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        if (r.data.status === "success") {
          setdepartmentslist(r.data.retval);
        }
      });
  }, []);

  useEffect(() => {
    fetchDepartments();
    searchStudents("");
  }, [fetchDepartments]);

  // Watch department change to fetch courses
  useEffect(() => {
    if (form.department) {
      fetchCoursesByDepartment(form.department);
    } else {
      setcourselist([]);
    }
  }, [form.department, fetchCoursesByDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStudentId || !form.department || !form.course) return;

    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addEnrollment",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        studentid: selectedStudentId,
        studentname,
        rollnumber,
        session,
        department: form.department,
        course: form.course,
        semester: form.semester,
        enrollmentnumber: form.enrollmentnumber,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setForm({
            department: "",
            course: "",
            semester: "",
            enrollmentnumber: "",
          });
          setSelectedStudentId("");
          setstudentname("");
          setrollnumber("");
          setsession("");
          alert("Enrollment added successfully!");
        }
      });
  };

  const searchStudents = (value) => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "searchstudent",
        searchkey: value,
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        r.data.status === "success"
          ? setstudents(r.data.retval)
          : setstudents([]);
      });
  };

  const handleStudentSearch = useCallback((e) => {
    const value = e.target.value;
    setsearchkey(value);
    searchStudents(value);
  }, []);

  const handleStudentSelection = useCallback((d) => {
    if (d.fname && d.id) {
      setstudentname(
        `${d.fname || ""} ${d.mname || ""} ${d.lname || ""}`.trim()
      );
      setrollnumber(d.rollnumber);
      setSelectedStudentId(d.id);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div
          className="col-md-4"
          style={{ maxHeight: "85vh", overflowY: "scroll" }}
        >
          <div className="form-group mb-2">
            <label htmlFor="search_student">Search student</label>
            <input
              type="search"
              id="search_student"
              value={searchkey}
              className="form-control bg-white"
              placeholder="Search student by name, contact, email"
              onChange={handleStudentSearch}
            />
          </div>
          {students &&
            students.length > 0 &&
            students.map((d) => {
              const isSelected = d.id === selectedStudentId;
              return (
                <div
                  key={d.id}
                  className={`alert ${isSelected ? "alert-danger" : "alert-success"
                    } m-0 mt-1 shadow-hover`}
                  onClick={() => handleStudentSelection(d)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>Sr: {d.id}</div>
                    <div>Roll Number: {d.rollnumber}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      Name: {d.fname} {d.mname} {d.lname}
                    </div>
                    <div>S/o: {d.father_name}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Ph: {d.contact}</div>
                    <div>Uid: {d.uid_number}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="col-md-8">
          <h4 className="mb-3">Student Enrollment</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentlist.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Course</label>
                <select
                  className="form-select"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courselist &&
                    courselist.map((d, i) => (
                      <option key={i} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Semester/Part</label>
                <select
                  className="form-select"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose --</option>
                  <option value="part_sem_1">Part/Semester 1</option>
                  <option value="part_sem_2">Part/Semester 2</option>
                  <option value="part_sem_3">Part/Semester 3</option>
                  <option value="part_sem_4">Part/Semester 4</option>
                  <option value="part_sem_5">Part/Semester 5</option>
                  <option value="part_sem_6">Part/Semester 6</option>
                  <option value="part_sem_7">Part/Semester 7</option>
                  <option value="part_sem_8">Part/Semester 8</option>
                  <option value="year_1">Year 1</option>
                  <option value="year_2">Year 2</option>
                  <option value="year_3">Year 3</option>
                  <option value="year_4">Year 4</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control bg-white"
                  value={studentname}
                  readOnly
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  className="form-control bg-white"
                  value={rollnumber}
                  readOnly
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Enrollment Number</label>
                <input
                  type="text"
                  className="form-control bg-white"
                  name="enrollmentnumber"
                  value={form.enrollmentnumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Session</label>
                <select
                  className="form-select"
                  name="session"
                  value={session}
                  onChange={(e) => setsession(e.target.value)}
                  required
                >
                  <option value="">Select Session</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Click to enroll</label>
                <button type="submit" className="btn btn-primary w-100">
                  Enroll Student
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
