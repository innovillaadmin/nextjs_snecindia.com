"use client";

import { API_PATH, LS_USERID, LS_USERROLE } from "@/app/config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import EnrollmentCard from "./EnrollmentCard";

const StudentCourseEnrollment = () => {
  const [data, setData] = useState([]);
  const fetchStudentEnrollment = useCallback(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchcourseenrollmentbystudentid",
        userid: localStorage.getItem(LS_USERID),
        userrole: localStorage.getItem(LS_USERROLE),
      })
      .then((r) => {
        r.data.status === "success" ? setData(r.data.retval) : setData([]);
      });
  }, []);

  useEffect(() => {
    fetchStudentEnrollment();
  }, [fetchStudentEnrollment]);

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((d, i) => (
          <div key={i}>
            <EnrollmentCard enrollment={d} />
          </div>
        ))
      ) : (
        <div className="card border-danger mb-3 mt-5 container">
          <div className="card-body text-danger">
            <strong>⚠️ No course enrollment available for this student.</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourseEnrollment;
