"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EnrollmentData = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const paymentStatusOptions = ["paid", "pending", "overdue"];

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  const fetchDepartmentList = () => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        action: "getDepartment",
      })
      .then((r) => {
        if (r.data.status === "success") {
          setDepartmentList(r.data.retval);
        }
      });
  };

  const handleDepartmentChange = (e) => {
    const depId = e.target.value;
    setSelectedDepartment(depId);
    setCourseList([]);
    setSelectedCourse("");
    setSessionList([]);
    setSelectedSession("");
    setSemesterList([]);
    setSelectedSemester("");
    setEnrollmentData([]);

    if (depId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchCoursesByDepartment",
          depid: depId,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setCourseList(r.data.retval);
          }
        });
    }
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSessionList([]);
    setSelectedSession("");
    setSemesterList([]);
    setSelectedSemester("");
    setEnrollmentData([]);

    if (courseId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchsessionbycourse",
          course: courseId,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setSessionList(r.data.retval);
          }
        });
    }
  };

  const handleSessionChange = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);
    setSemesterList([]);
    setSelectedSemester("");
    setEnrollmentData([]);

    if (sessionId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchsemesterbysession",
          session: sessionId,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setSemesterList(r.data.retval);
          }
        });
    }
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "getenrollmentdata",
          selectedDepartment,
          selectedCourse,
          selectedSession,
          selectedSemester,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setEnrollmentData(r.data.retval);
          }
        });
    } else {
      setEnrollmentData([]);
    }
  }, [selectedDepartment, selectedCourse, selectedSession, selectedSemester]);

  // Handle payment status update
  const handlePaymentStatusChange = (enrollmentId, newStatus) => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        action: "updatePaymentStatusAgainstEnrollment",
        enrollment_id: enrollmentId,
        new_status: newStatus,
      })
      .then((r) => {
        if (r.data.status === "success") {
          // Update local state too
          setEnrollmentData((prev) =>
            prev.map((item) =>
              item.id === enrollmentId
                ? { ...item, payment_status: newStatus }
                : item
            )
          );
        }
      });
  };

  return (
    <div>
      <div className="row m-0 mx-md-3">
        <div className="col-md-3 bg-white shadow mt-3 p-md-2 border rounded">
          <div className="bg-warning fw-bold rounded p-1 mb-3">Data Filter</div>
          {/* Same filter code as before */}
          {/* ... */}
          <div className="mb-2">
            <label htmlFor="departmentname">Department Name</label>
            <select
              className="form-control bg-light border border-secondary"
              id="departmentname"
              name="departmentname"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">Select Department</option>
              {departmentList.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="coursename">Course Name</label>
            <select
              className="form-control bg-light border border-secondary"
              id="coursename"
              name="coursename"
              value={selectedCourse}
              onChange={handleCourseChange}
              disabled={!selectedDepartment}
            >
              <option value="">Select Course</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="session">Session</label>
            <select
              className="form-control bg-light border border-secondary"
              id="session"
              name="session"
              value={selectedSession}
              onChange={handleSessionChange}
              disabled={!selectedCourse}
            >
              <option value="">Select Session</option>
              {sessionList.map((sess, i) => (
                <option key={i} value={sess.session}>
                  {sess.session}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="semestername">Part / Semester</label>
            <select
              className="form-control bg-light border border-secondary"
              id="semestername"
              name="semestername"
              value={selectedSemester}
              onChange={handleSemesterChange}
              disabled={!selectedSession}
            >
              <option value="">Select Semester</option>
              {semesterList.map((sem, i) => (
                <option key={i} value={sem.semester}>
                  {sem.semester}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-9">
          <div className="overflow-auto mt-3 border">
            <table className="table table-responsive table-striped table-white rounded shadow">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Payment Status</th>
                  <th>Session</th>
                  <th>Semester</th>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Enrollment Number</th>
                  <th>Department</th>
                  <th>Course Name</th>
                  <th>Course Duration</th>
                  <th>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentData.length > 0 ? (
                  enrollmentData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={item.payment_status}
                          style={{ width: "100px" }}
                          onChange={(e) =>
                            handlePaymentStatusChange(item.id, e.target.value)
                          }
                        >
                          {paymentStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{item.session}</td>
                      <td>{item.semester}</td>
                      <td>{item.student_name}</td>
                      <td>{item.roll_number}</td>
                      <td>{item.enrollment_number}</td>
                      <td>{item.department_name}</td>
                      <td>{item.course_name}</td>
                      <td>{item.course_duration}</td>
                      <td>{item.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentData;
