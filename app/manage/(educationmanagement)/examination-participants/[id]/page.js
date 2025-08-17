"use client";
import { API_PATH, USERDATA } from "@/app/config";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const ExaminationParticipants = () => {
  const [urlid, seturlid] = useState("");
  const [data, setdata] = useState([]);

  const fetchParticipants = useCallback(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchexaminationparticipants",
        ...USERDATA(),
        examid: urlid,
      })
      .then((r) => {
        r.data.status === "success" && setdata(r.data.retval);
      });
  }, [urlid]);

  useEffect(() => {
    seturlid(window.location.href.split("/").pop());
    if (urlid > 0) {
      fetchParticipants();
    }
  }, [urlid, fetchParticipants]);

  return (
    <div className="mh-90">
      <div className="container mt-3">
        <div className="text-center">
          <h4>Examination Participants</h4>
        </div>
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>Marksheet</th>
              <th>View Answers</th>
              <th>Student Id</th>
              <th>Student name</th>
              <th>Roll Number</th>
              <th>Enrollment NO</th>
              <th>Department Name</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link
                        href={`/manage/printable-marksheet/?examid=${urlid}&studentid=${d.student_id}&&courseid=${d.course_id}`}
                      >
                        <button className="btn btn-primary">
                          View Marksheet
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/manage/examination-answer-validation/?examid=${urlid}&studentid=${d.student_id}`}
                      >
                        <button className="btn btn-primary">
                          View Answers
                        </button>
                      </Link>
                    </td>
                    <td>{d.student_id}</td>
                    <td>{d.student_name}</td>
                    <td>{d.rollnumber}</td>
                    <td>{d.enrollment_no}</td>
                    <td>{d.department_name}</td>
                    <td>{d.course_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExaminationParticipants;
