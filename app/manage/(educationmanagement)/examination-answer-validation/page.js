"use client";
import { API_PATH, USERDATA } from "@/app/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useMemo } from "react";

const ExamAnswerValidation = () => {
  const searchParams = useSearchParams();
  const examid = searchParams.get("examid");
  const studentid = searchParams.get("studentid");

  const [data, setdata] = useState([]);

  const fetchAnswers = useCallback(() => {
    if (!examid || !studentid) return;
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchanswersforvalidation",
        ...USERDATA(),
        studentid,
        examid,
      })
      .then((r) => {
        if (r?.data?.status === "success" && Array.isArray(r.data.retval)) {
          setdata(r.data.retval);
        }
      })
      .catch(() => {});
  }, [examid, studentid]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  // 👇 compute totals
  const { totalMarksSum, obtainedMarksSum } = useMemo(() => {
    return data.reduce(
      (acc, row) => {
        acc.totalMarksSum += Number(row.total_marks) || 0;
        acc.obtainedMarksSum += Number(row.marks_obtained) || 0;
        return acc;
      },
      { totalMarksSum: 0, obtainedMarksSum: 0 }
    );
  }, [data]);

  const handleLocalChange = (id, type, rawValue) => {
    setdata((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [type]: rawValue } : row))
    );
  };

  const saveMarks = async (id, type, rawValue) => {
    const marks = Number(rawValue);
    if (Number.isNaN(marks)) return;
    const coltype =
      type === "marks_obtained" ? "obtained_marks" : "total_marks";
    try {
      const r = await axios.post(API_PATH + "ManageEducation.php", {
        action: "updateanswermarks",
        ...USERDATA(),
        id,
        marks,
        coltype,
      });
      if (r?.data?.status === "success") {
        fetchAnswers();
      }
    } catch (e) {
      fetchAnswers();
    }
  };

  return (
    <div className="mh-90">
      <div className="container my-4">
        <h4 className="mb-3 d-flex justify-content-between align-items-center">
          <span>Answer Sheet</span>
          <span className="badge bg-primary fs-6">
            Obtained: {obtainedMarksSum}, Total: {totalMarksSum}
          </span>
        </h4>

        <div className="table-responsive">
          <table className="table table-bordered bg-white">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Your Answer</th>
                <th>Is Correct?</th>
                <th>Total Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id ?? i}>
                  <td>{i + 1}</td>
                  <td>{item.question}</td>
                  <td>{item.correct_answer}</td>
                  <td>{item.student_provided_answer}</td>
                  <td>
                    {item.is_correct === "yes" ? (
                      <span className="badge bg-success">Correct</span>
                    ) : (
                      <span className="badge bg-danger">Wrong</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.total_marks ?? ""}
                      onChange={(e) =>
                        handleLocalChange(
                          item.id,
                          "total_marks",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        saveMarks(item.id, "total_marks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.marks_obtained ?? ""}
                      onChange={(e) =>
                        handleLocalChange(
                          item.id,
                          "marks_obtained",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        saveMarks(item.id, "marks_obtained", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td colSpan={7} className="text-center">
                    No rows found.
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

export default ExamAnswerValidation;
