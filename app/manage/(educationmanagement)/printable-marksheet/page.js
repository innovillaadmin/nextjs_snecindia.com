"use client";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
import {
  API_PATH,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_NUMBER,
  SITENAME,
  USERDATA,
} from "@/app/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const dataformat = {
  course: {},
  marks: [],
};

const Marksheet = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [data, setdata] = useState(dataformat);

  const params = useSearchParams();
  const examid = params.get("examid");
  const studentid = params.get("studentid");
  const courseid = params.get("courseid");

  useEffect(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchMarksheet",
        ...USERDATA(),
        examid,
        studentid,
        courseid,
      })
      .then((r) => r.data.status === "success" && setdata(r.data));
  }, []);

  return (
    <div className="pt-3 text-center">
      <button onClick={reactToPrintFn} className="btn btn-primary">
        Print
      </button>
      <div className="page-wrapper d-flex justify-content-center align-items-center py-3 bg-light">
        <div
          className="marksheet bg-white p-4 shadow-sm"
          ref={contentRef}
          style={{
            backgroundImage: `url('/assets/img/background/marksheet_background.png')`,
            backgroundSize: "100% 100%",
          }}
        >
          {/* Section 1: Institute Information */}
          <section className="text-center border-bottom pb-3 mb-2">
            <div className="row">
              <div className="col-4">
                <img
                  src="/assets/img/sslogo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="img-fluid"
                />
              </div>
              <div className="col-8 text-start pt-4">
                <h2 className="fw-bold mb-1">{SITENAME}</h2>
                <p className="mb-1">{CONTACT_ADDRESS}</p>
                <p className="mb-0">
                  Phone: {CONTACT_NUMBER} | Email: {CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </section>
          <h5 className="fw-bold mt-3 mb-3">REPORT CARD</h5>

          {/* Section 1.1: Student + Course Info */}
          {data.course && (
            <section className="mb-4 text-start">
              <div className="row">
                <div className="col-6">
                  <p>
                    <strong>Student Name:</strong> {data.course.student_name}
                  </p>
                  <p>
                    <strong>Roll No:</strong> {data.course.rollnumber}
                  </p>
                  <p>
                    <strong>Enrollment No:</strong> {data.course.enrollment_no}
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    <strong>Department:</strong> {data.course.department_name}
                  </p>
                  <p>
                    <strong>Course:</strong> {data.course.course_name}
                  </p>
                  <p>
                    <strong>Session/Semester:</strong> {data.course.session} /{" "}
                    {data.course.semester}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section 2: Subject + Marks Table */}
          <section className="mb-4">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-secondary">
                <tr>
                  <th style={{ width: "40%" }}>Subject</th>
                  <th style={{ width: "20%" }}>Total Marks</th>
                  <th style={{ width: "20%" }}>Marks Obtained</th>
                  <th style={{ width: "20%" }}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {data.marks && data.marks.length > 0 ? (
                  data.marks.map((m, i) => (
                    <tr key={i}>
                      <td>{m.subject_name}</td>
                      <td>{m.total_marks}</td>
                      <td>{m.obtained_marks}</td>
                      <td>{m.grade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      No marks data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Section 3: Final Verdict + Verification */}
          <section className="d-flex justify-content-between align-items-start mt-5">
            <div>
              <p className="fw-bold mb-1">Final Verdict:</p>
              <p className="text-success fw-semibold">
                {data.marks && data.marks.length > 0
                  ? "PASS with Distinction"
                  : "-"}
              </p>
            </div>
            <div className="text-end">
              <p className="mb-5">______________________</p>
              <p className="fw-bold">Authority Signature</p>
              <p className="text-muted">Principal / Head of Institute</p>
            </div>
          </section>
        </div>

        {/* Page specific styles */}
        <style jsx>{`
          .marksheet {
            width: 8.27in; /* A4 width */
            height: 11.69in; /* A4 height */
            border: 1px solid #000;
            background: #fff;
          }
          .page-wrapper {
            min-height: 100vh;
          }
          @media print {
            .student-info {
              display: grid !important;
              grid-template-columns: 1fr 1fr; /* two equal columns */
              gap: 10px;
            }

            .student-info div {
              padding: 4px 0;
              font-size: 14px; /* keep text consistent */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Marksheet;
