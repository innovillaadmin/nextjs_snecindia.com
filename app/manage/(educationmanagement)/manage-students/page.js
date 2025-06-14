"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_PATH, LS_USERID, LS_USERNAME, LS_USERTOKEN } from "@/app/config";

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAdmissions = useCallback(() => {
    axios
      .post(API_PATH + "ManageEducation.php", {
        action: "fetchAdmissions",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        if (r.data.status === "success") {
          setAdmissions(r.data.retval);
        }
      });
  }, []);
  useEffect(() => {
    fetchAdmissions();
  }, []);

  const [formdata, setformdata] = useState({
    fname: "",
    mname: "",
    lname: "",
    gender: "",
    contact_number: "",
    email_address: "",
    dob: "",
    whatsapp_number: "",
    alternate_number: "",
    photograph: "",
    admission_date: "",
    admission_date: "",
    academic_year: "",
    previous_qualification: "",
    previous_institute: "",
    previous_board_university: "",
    year_of_passing: "",
    marks_obtained: "",
    grade_or_percentage: "",
    caste_category: "",
    nationality: "indian",
    religion: "hindu",
    blood_group: "",
    father_name: "",
    mother_name: "",
    guardian_contact: "",
    address: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    await axios
      .post(API_PATH + "ManageEducation.php", {
        action: "addAdmission",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        username: localStorage.getItem(LS_USERNAME),
        ...formdata,
      })
      .then((r) => {
        if (r.data.status === "success") {
          alert("Admission added successfully");
          setformdata({
            fname: "",
            mname: "",
            lname: "",
            gender: "",
            contact_number: "",
            email_address: "",
            dob: "",
            whatsapp_number: "",
            alternate_number: "",
            photograph: "",
            admission_date: "",
            academic_year: "",
            previous_qualification: "",
            previous_institute: "",
            previous_board_university: "",
            year_of_passing: "",
            marks_obtained: "",
            grade_or_percentage: "",
            caste_category: "",
            nationality: "indian",
            religion: "hindu",
            blood_group: "",
            father_name: "",
            mother_name: "",
            guardian_contact: "",
            address: "",
            status: "active",
          });
          fetchAdmissions();
          // setShowForm(false); // Optional: auto-hide after submit
        }
      });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Manage Admissions</h3>
        <button
          className="btn btn-success"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Hide Form" : "Add New Admission"}
        </button>
      </div>

      {showForm && (
        <form className="row g-3 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={formdata.fname}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              name="mname"
              id="mname"
              value={formdata.mname}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={formdata.lname}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Gender</label>
            <select
              type="text"
              name="gender"
              id="gender"
              value={formdata.gender}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Contact Number</label>
            <input
              type="number"
              min={0}
              name="contact_number"
              id="contact_number"
              value={formdata.contact_number}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email_address"
              id="email_address"
              value={formdata.email_address}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">DOB</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formdata.dob}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Whatsapp Number</label>
            <input
              type="number"
              min={0}
              name="whatsapp_number"
              id="whatsapp_number"
              value={formdata.whatsapp_number}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Alternate Number</label>
            <input
              type="number"
              min={0}
              name="alternate_number"
              id="alternate_number"
              value={formdata.alternate_number}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Photograph</label>
            <input
              type="file"
              name="photograph"
              id="photograph"
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Admission Date</label>
            <input
              type="date"
              name="admission_date"
              id="admission_date"
              value={formdata.admission_date}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Academic Year</label>
            <select
              name="academic_year"
              id="academic_year"
              value={formdata.academic_year}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Previous Qualification</label>
            <input
              type="text"
              name="previous_qualification"
              id="previous_qualification"
              value={formdata.previous_qualification}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Prev Institute</label>
            <input
              type="text"
              name="previous_institute"
              id="previous_institute"
              value={formdata.previous_institute}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Prev Board/University</label>
            <input
              type="text"
              name="previous_board_university"
              id="previous_board_university"
              value={formdata.previous_board_university}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Passing Year</label>
            <input
              type="date"
              name="year_of_passing"
              id="year_of_passing"
              value={formdata.year_of_passing}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Marks Obtained</label>
            <input
              type="text"
              name="marks_obtained"
              id="marks_obtained"
              value={formdata.marks_obtained}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Grade/Percentage</label>
            <input
              type="text"
              name="grade_or_percentage"
              id="grade_or_percentage"
              value={formdata.grade_or_percentage}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Caste Category</label>
            <select
              name="caste_category"
              id="caste_category"
              value={formdata.caste_category}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Religion</label>
            <select
              name="religion"
              id="religion"
              value={formdata.religion}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="sikh">Sikh</option>
              <option value="christian">Christian</option>
              <option value="jain">Jain</option>
              <option value="buddhist">Buddhist</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Blood Group</label>
            <select
              name="blood_group"
              id="blood_group"
              value={formdata.blood_group}
              onChange={handleChange}
              className="form-control bg-light"
            >
              <option value="not_specified">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Father's Name</label>
            <input
              type="text"
              name="father_name"
              id="father_name"
              value={formdata.father_name}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mother's Name</label>
            <input
              type="text"
              name="mother_name"
              id="mother_name"
              value={formdata.mother_name}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Guardian Contact</label>
            <input
              type="text"
              name="guardian_contact"
              id="guardian_contact"
              value={formdata.guardian_contact}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Complete Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formdata.address}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">
              Save Admission
            </button>
          </div>
        </form>
      )}

      <h4 className="mt-5">Admission Records</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Whatsapp Number</th>
              <th>Alternate Number</th>
              <th>Admission Date</th>
              <th>Academic Year</th>
              <th>Admission Status</th>
              <th>Mode Of Admission</th>
              <th>Institute</th>
              <th>Board/University</th>
              <th>Passing Year</th>
              <th>Marks</th>
              <th>Grade/%</th>
              <th>Category</th>
              <th>Nationality</th>
              <th>Religion</th>
              <th>Blood Group</th>
              <th>Father</th>
              <th>Mother</th>
              <th>Guardian Contact</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {admissions.length === 0 ? (
              <tr>
                <td colSpan="30" className="text-center">
                  No admissions yet.
                </td>
              </tr>
            ) : (
              admissions.map((a, i) => (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.fname + "" + a.mname + "" + a.lname}</td>
                  <td>{a.gender}</td>
                  <td>{a.contact}</td>
                  <td>{a.email}</td>
                  <td>{a.address}</td>
                  <td>{a.dob}</td>
                  <td>{a.whatsapp_number}</td>
                  <td>{a.alternate_number}</td>
                  <td>{a.enrollment_date}</td>
                  <td>{a.academic_year}</td>
                  <td>{a.admission_status}</td>
                  <td>{a.mode_of_admission}</td>
                  <td>{a.previous_institute}</td>
                  <td>{a.previous_board_university}</td>
                  <td>{a.year_of_passing}</td>
                  <td>{a.marks_obtained}</td>
                  <td>{a.grade_or_percentage}</td>
                  <td>{a.caste_category}</td>
                  <td>{a.nationality}</td>
                  <td>{a.religion}</td>
                  <td>{a.blood_group}</td>
                  <td>{a.father_name}</td>
                  <td>{a.mother_name}</td>
                  <td>{a.guardian_contact}</td>
                  <td>{a.date_added}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmissions;
