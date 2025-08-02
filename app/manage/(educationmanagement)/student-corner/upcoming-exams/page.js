"use client";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_PATH, formatDate, formatTime, USERDATA } from "@/app/config";
import { useRouter } from "next/navigation";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await axios.post(API_PATH + `ManageEducation.php`, {
          action: "fetchupcomingexams",
          ...USERDATA(),
        });
        res.data.status === "success" && setExams(res.data.retval);
      } catch (err) {
        console.error("Error fetching exams", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  const handleAppear = useCallback((examId) => {
    router.push('/manage/student-corner/virtual-exam-room/' + examId);
  }, []);

  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Exam Schedule</h2>

      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Appear In Exam.</th>
              <th>Subject Name</th>
              <th>Course Name</th>
              <th>Exam Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => (
              <tr key={i}>
                <td>
                  {exam.date === today ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAppear(exam.id)}
                    >
                      Appear for Exam
                    </button>
                  ) : (
                    <span className="text-muted">
                      Will be available on Exam date
                    </span>
                  )}

                </td>
                <td>{exam.subject_name}</td>
                <td>{exam.course_name}</td>
                <td>{formatDate(exam.date)}</td>
                <td>
                  {formatTime(exam.start_time)} - {formatTime(exam.end_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
