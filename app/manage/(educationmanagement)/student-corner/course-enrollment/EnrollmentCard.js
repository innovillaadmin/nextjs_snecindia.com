import React from "react";
export default function EnrollmentCard({ enrollment }) {
  if (!enrollment) {
    return (
      <div className="alert alert-warning">No enrollment data provided.</div>
    );
  }

  return (
    <div className="container my-4">
      <div className="card border-primary">
        <div className="card-header base-gradient text-dark">
          <h5 className="mb-0">{enrollment.course_name}</h5>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Session:</strong> {enrollment.session}
            </div>
            <div className="col-md-6">
              <strong>Semester:</strong> {enrollment.semester}
            </div>
          </div>

          <hr />

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Student ID:</strong> {enrollment.student_id}
            </div>
            <div className="col-md-6">
              <strong>Student Name:</strong> {enrollment.student_name}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Roll Number:</strong> {enrollment.rollnumber}
            </div>
            <div className="col-md-6">
              <strong>Enrollment No:</strong> {enrollment.enrollment_no}
            </div>
          </div>

          <hr />

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Department ID:</strong> {enrollment.department_id}
            </div>
            <div className="col-md-6">
              <strong>Department Name:</strong> {enrollment.department_name}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Course ID:</strong> {enrollment.course_id}
            </div>
            <div className="col-md-6">
              <strong>Course Name:</strong> {enrollment.course_name}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Course Duration:</strong> {enrollment.course_duration}
            </div>
            <div className="col-md-6">
              <strong>Course Start Date:</strong> {enrollment.course_start_date}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Course End Date:</strong> {enrollment.course_end_date}
            </div>
            <div className="col-md-6">
              <strong>Fee Payment Status:</strong>{" "}
              {enrollment.fee_payment_status === "pending" && (
                <button
                  type="button"
                  className="text-capitalize p-1 btn btn-outline-danger"
                >
                  {enrollment.fee_payment_status}
                </button>
              )}
              {enrollment.fee_payment_status !== "pending" && (
                <button
                  type="button"
                  className="text-capitalize p-1 btn btn-outline-success"
                >
                  {enrollment.fee_payment_status}
                </button>
              )}
            </div>
          </div>

          <hr />

          <div className="row mb-2">
            <div className="col-md-6">
              <strong>Admit Card Status:</strong>{" "}
              {enrollment.admit_card_status === "pending" && (
                <button
                  type="button"
                  className="text-capitalize p-1 btn btn-outline-danger"
                >
                  {enrollment.admit_card_status}
                </button>
              )}
              {enrollment.admit_card_status !== "pending" && (
                <button
                  type="button"
                  className="text-capitalize p-1 btn btn-outline-success"
                >
                  {enrollment.admit_card_status}
                </button>
              )}
            </div>
            <div className="col-md-6">
              <strong>Added By ID:</strong> {enrollment.added_by_id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
