"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const ExamQuestions = () => {
  // Filters
  const [departmentList, setDepartmentList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSession, setSelectedSession] = useState("2025-2026");

  // Question list
  const [questionList, setQuestionList] = useState([]);

  // Add form visibility
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [examDate, setExamDate] = useState("");
  const [examStartTime, setExamStartTime] = useState("");
  const [examEndTime, setExamEndTime] = useState("");

  // Fetch departments on load
  useEffect(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        action: "getDepartment",
      })
      .then((res) => {
        if (res.data.status === "success") {
          setDepartmentList(res.data.retval);
        }
      });
  }, []);

  // Dependent selects
  const handleDepartmentChange = (e) => {
    const depId = e.target.value;
    setSelectedDepartment(depId);
    setSelectedCourse("");
    setSelectedSemester("");
    setSelectedSubject("");
    setCourseList([]);
    setSemesterList([]);
    setSubjectList([]);
    setQuestionList([]);

    if (depId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchCoursesByDepartment",
          depid: depId,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setCourseList(res.data.retval);
          }
        });
    }
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSelectedSemester("");
    setSelectedSubject("");
    setSemesterList([]);
    setSubjectList([]);
    setQuestionList([]);

    if (courseId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchsemesterbycourse",
          course: courseId,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setSemesterList(res.data.retval);
          }
        });
    }
  };

  const handleSemesterChange = (e) => {
    const semesterId = e.target.value;
    setSelectedSemester(semesterId);
    setSelectedSubject("");
    setSubjectList([]);
    setQuestionList([]);

    if (semesterId) {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchsubjectbysemester",
          semester: semesterId,
          selectedCourse,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setSubjectList(res.data.retval);
          }
        });
    }
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    setQuestionList([]);

    if (subjectId) {
      fetchQuestions();
    }
  };

  const fetchQuestions = useCallback(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        action: "fetchExamSchedule",
        department: selectedDepartment,
        course: selectedCourse,
        semester: selectedSemester,
        subject: selectedSubject,
        session: selectedSession,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setQuestionList(res.data.retval);
        } else {
          setQuestionList([]);
        }
      });
  }, [
    selectedDepartment,
    selectedCourse,
    selectedSemester,
    selectedSubject,
    selectedSession,
  ]);

  const handleScheduleExamination = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !selectedDepartment ||
        !selectedCourse ||
        !selectedSemester ||
        !selectedSubject ||
        !examDate ||
        !examStartTime ||
        !examEndTime
      ) {
        alert("Please fill all fields.");
        return;
      }

      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "addExamSchedule",
          department: selectedDepartment,
          course: selectedCourse,
          semester: selectedSemester,
          subject: selectedSubject,
          session: selectedSession,
          date: examDate,
          startTime: examStartTime,
          endTime: examEndTime,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setExamDate("");
            setExamEndTime("");
            setExamStartTime("");
            fetchQuestions();
          } else {
            alert("Error adding question");
          }
        });
    },
    [
      selectedDepartment,
      selectedCourse,
      selectedSemester,
      selectedSubject,
      selectedSession,
      examDate,
      examStartTime,
      examEndTime,
    ]
  );

  useEffect(() => {
    fetchQuestions();
  }, [
    fetchQuestions,
    selectedDepartment,
    selectedCourse,
    selectedSemester,
    selectedSubject,
    selectedSession,
  ]);
  return (
    <div className="row m-0 mx-md-3">
      <div className="col-md-3 bg-white shadow mt-3 p-md-2 border rounded">
        <div className="bg-warning fw-bold rounded p-1 mb-3">
          Filter Examination
        </div>

        <div className="mb-2">
          <label>Department</label>
          <select
            className="form-control"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departmentList.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Course</label>
          <select
            className="form-control"
            value={selectedCourse}
            onChange={handleCourseChange}
            disabled={!selectedDepartment}
          >
            <option value="">Select Course</option>
            {courseList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Semester</label>
          <select
            className="form-control"
            value={selectedSemester}
            onChange={handleSemesterChange}
            disabled={!selectedCourse}
          >
            <option value="">Select Semester</option>
            {semesterList.map((s, i) => (
              <option key={i} value={s.part_or_semester}>
                {s.part_or_semester}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Subject</label>
          <select
            className="form-control"
            value={selectedSubject}
            onChange={handleSubjectChange}
            disabled={!selectedSemester}
          >
            <option value="">Select Subject</option>
            {subjectList.map((s) => (
              <option key={s.id} value={s.id} className="text-dark">
                {s.subject_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Session</label>
          <select
            className="form-control"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <button
          className="btn btn-primary mt-2"
          disabled={!selectedSubject}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Examination"}
        </button>
      </div>

      <div className="col-md-9 mt-3">
        {showForm && (
          <div className="border rounded shadow p-3 mb-3 bg-light">
            <h5 className="mb-3">Schedule Examination</h5>
            <form onSubmit={handleScheduleExamination}>
              <div className="row ">
                <div className="col-md-4 mb-2">
                  <label>Examination Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={examStartTime}
                    onChange={(e) => setExamStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={examEndTime}
                    onChange={(e) => setExamEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-scroll border rounded shadow">
          <table className="table table-striped">
            <thead className="table-white">
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Department</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Session</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {questionList.length > 0 ? (
                questionList.map((q, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <button type="button" className="btn btn-danger">
                        Check Answers
                      </button>
                    </td>
                    <td>{q.department_name}</td>
                    <td>{q.course_name}</td>
                    <td>{q.semester}</td>
                    <td>{q.session}</td>
                    <td>{q.subject_name}</td>
                    <td>{q.date}</td>
                    <td>{q.start_time}</td>
                    <td>{q.end_time}</td>
                    <td>{q.status}</td>
                    <td>{q.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;
