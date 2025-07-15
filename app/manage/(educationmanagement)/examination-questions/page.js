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
  const [questionText, setQuestionText] = useState("");
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState("");

  const [marks, setMarks] = useState("");

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
      fetchQuestions(
        selectedDepartment,
        selectedCourse,
        selectedSemester,
        subjectId
      );
    }
  };

  const fetchQuestions = useCallback(
    (depId, courseId, semesterId, subjectId) => {
      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "fetchExamQuestions",
          department: depId,
          course: courseId,
          semester: semesterId,
          subject: subjectId,
          session: selectedSession,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setQuestionList(res.data.retval);
          }
        });
    },
    []
  );

  const handleAddQuestion = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !selectedDepartment ||
        !selectedCourse ||
        !selectedSemester ||
        !selectedSubject ||
        !questionText ||
        !selectedSession ||
        !marks
      ) {
        alert("Please fill all fields.");
        return;
      }

      axios
        .post(API_PATH + "ManageEducation.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          action: "addExamQuestion",
          department: selectedDepartment,
          course: selectedCourse,
          semester: selectedSemester,
          subject: selectedSubject,
          question_text: questionText,
          session: selectedSession,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          correct_answer: correctAnswer,
          marks: marks,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setQuestionText("");
            setoption1("");
            setoption2("");
            setoption3("");
            setoption4("");
            setcorrectAnswer("");
            setMarks("");
            fetchQuestions(
              selectedDepartment,
              selectedCourse,
              selectedSemester,
              selectedSubject,
              selectedSession
            );
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
      questionText,
      selectedSession,
      marks,
    ]
  );

  useEffect(() => {
    fetchQuestions(
      selectedDepartment,
      selectedCourse,
      selectedSemester,
      selectedSubject
    );
  }, [
    fetchQuestions,
    selectedDepartment,
    selectedCourse,
    selectedSemester,
    selectedSubject,
  ]);
  return (
    <div className="row m-0 mx-md-3">
      <div className="col-md-3 bg-white shadow mt-3 p-md-2 border rounded">
        <div className="bg-warning fw-bold rounded p-1 mb-3">
          Filter Questions
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
            onChange={handleSubjectChange}
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
          {showForm ? "Close Form" : "Add Question"}
        </button>
      </div>

      <div className="col-md-9 mt-3">
        {showForm && (
          <div className="border rounded shadow p-3 mb-3 bg-light">
            <h5 className="mb-3">Add New Question</h5>
            <form onSubmit={handleAddQuestion}>
              <div className="row">
                <div className="col-md-12 mb-2">
                  <label>Question Text</label>
                  <textarea
                    className="form-control"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="col-md-3 mb-2">
                  <label>Option 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option1}
                    onChange={(e) => setoption1(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label>Option 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option2}
                    onChange={(e) => setoption2(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label>Option 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option3}
                    onChange={(e) => setoption3(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label>Option 4</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option4}
                    onChange={(e) => setoption4(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label>Correct Answer</label>
                  <select
                    className="form-control"
                    value={correctAnswer}
                    onChange={(e) => setcorrectAnswer(e.target.value)}
                    required
                  >
                    <option value="">Select Answer</option>
                    <option value="option_1">Option 1</option>
                    <option value="option_2">Option 2</option>
                    <option value="option_3">Option 3</option>
                    <option value="option_4">Option 4</option>
                  </select>
                </div>
                <div className="col-md-3 mb-2">
                  <label>Marks</label>
                  <input
                    type="number"
                    className="form-control"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
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

        <div className="overflow-scroll border rounded shadow">
          <table className="table table-striped">
            <thead className="table-white">
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Answer</th>
                <th>Marks</th>
                <th>Added By</th>
                <th>Added At</th>
              </tr>
            </thead>
            <tbody>
              {questionList.length > 0 ? (
                questionList.map((q, i) => (
                  <tr key={i}>
                    <td>{q.id}</td>
                    <td>{q.question}</td>
                    <td>{q.option_1}</td>
                    <td>{q.option_2}</td>
                    <td>{q.option_3}</td>
                    <td>{q.option_4}</td>
                    <td>{q.correct_answer}</td>
                    <td>{q.marks}</td>
                    <td>{q.created_by}</td>
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
