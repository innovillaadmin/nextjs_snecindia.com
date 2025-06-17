"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  API_PATH,
  LS_USERID,
  LS_USERNAME,
  LS_USERTOKEN,
  STATE_LIST,
} from "@/app/config";

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // initial form data
  const fd = {
    rollnumber: "", //
    fname: "", //
    mname: "", //
    lname: "", //
    mother_name: "",
    father_name: "",
    dob: "",
    gender: "",
    caste_category: "",
    uid_number: "",
    nationality: "indian",
    corresponding_address: "",
    corresponding_city: "",
    corresponding_state: "",
    corresponding_pincode: "",
    permanent_address: "",
    permanent_city: "",
    permanent_state: "",
    permanent_pincode: "",
    contact_number_father: "",
    contact_number_mother: "",
    contact_number: "",
    alternate_number: "",
    email_address: "",
    whatsapp_number: "",
    photograph: null,
    highschool_school_name: "",
    highschool_board_university: "",
    highschool_year_of_passing: "",
    highschool_stream: "",
    highschool_marks_obtained: "",
    highschool_marks_in_pertentage: "",
    intermediate_school_name: "",
    intermediate_board_university: "",
    intermediate_year_of_passing: "",
    intermediate_stream: "",
    intermediate_marks_obtained: "",
    intermediate_marks_in_pertentage: "",
    diploma_school_name: "",
    diploma_board_university: "",
    diploma_year_of_passing: "",
    diploma_stream: "",
    diploma_marks_obtained: "",
    diploma_marks_in_pertentage: "",
    graduation_school_name: "",
    graduation_board_university: "",
    graduation_year_of_passing: "",
    graduation_stream: "",
    graduation_marks_obtained: "",
    graduation_marks_in_pertentage: "",
    others_school_name: "",
    others_board_university: "",
    others_year_of_passing: "",
    others_stream: "",
    others_marks_obtained: "",
    others_marks_in_pertentage: "",
  };
  const [formdata, setformdata] = useState(fd);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setformdata({ ...formdata, photograph: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append all fields
    Object.entries(formdata).forEach(([key, value]) => {
      if (key === "photograph" && value instanceof File) {
        form.append("photograph", value); // image file
      } else {
        form.append(key, value);
      }
    });

    // Optional flag to detect action
    form.append("action", "addAdmission");
    form.append("userid", localStorage.getItem(LS_USERID));
    form.append("username", localStorage.getItem(LS_USERNAME));
    form.append("usertoken", localStorage.getItem(LS_USERTOKEN));

    try {
      const res = await axios.post(API_PATH + "ManageEducation.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        alert("Admission added successfully");
        setformdata(fd);
        fetchAdmissions();
        // setShowForm(false); // Optional: auto-hide after submit
      }
      console.log(res.data); // handle success
    } catch (err) {
      console.error("Error:", err);
    }
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
            <label className="form-label">Roll Number</label>
            <input
              type="text"
              name="rollnumber"
              id="rollnumber"
              value={formdata.rollnumber}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
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
            <label className="form-label">Mother Name</label>
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
            <label className="form-label">Father Name</label>
            <input
              type="text"
              name="father_name"
              id="father_name"
              value={formdata.father_name}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formdata.dob}
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
            <label className="form-label">Adhaar Number</label>
            <input
              type="number"
              min={0}
              name="uid_number"
              id="uid_number"
              value={formdata.uid_number}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <label className="form-label">Correspondance Address</label>
            <input
              type="text"
              name="corresponding_address"
              id="corresponding_address"
              value={formdata.corresponding_address}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Correspondance City</label>
            <input
              type="text"
              name="corresponding_city"
              id="corresponding_city"
              value={formdata.corresponding_city}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Correspondance State</label>
            <select
              name="corresponding_state"
              id="corresponding_state"
              value={formdata.corresponding_state}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="">Select from List</option>
              {STATE_LIST.map((d, i) => {
                return (
                  <option key={i} value={d}>
                    {d}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Pincode</label>
            <input
              type="number"
              min={0}
              name="corresponding_pincode"
              id="corresponding_pincode"
              value={formdata.corresponding_pincode}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-6">
            <label className="form-label">Permanent Address</label>
            <input
              type="text"
              name="permanent_address"
              id="permanent_address"
              value={formdata.permanent_address}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Permanent City</label>
            <input
              type="text"
              name="permanent_city"
              id="permanent_city"
              value={formdata.permanent_city}
              onChange={handleChange}
              className="form-control bg-light"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Permanent State</label>
            <select
              name="permanent_state"
              id="permanent_state"
              value={formdata.permanent_state}
              onChange={handleChange}
              className="form-control bg-light"
              required
            >
              <option value="">Select from List</option>
              {STATE_LIST.map((d, i) => {
                return (
                  <option key={i} value={d}>
                    {d}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Pincode</label>
            <input
              type="number"
              min={0}
              name="permanent_pincode"
              id="permanent_pincode"
              value={formdata.permanent_pincode}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <label className="form-label">Father's Contact Number</label>
            <input
              type="number"
              min={0}
              name="contact_number_father"
              id="contact_number_father"
              value={formdata.contact_number_father}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Mother's Contact Number</label>
            <input
              type="number"
              min={0}
              name="contact_number_mother"
              id="contact_number_mother"
              value={formdata.contact_number_mother}
              onChange={handleChange}
              className="form-control bg-light"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Student's Contact Number</label>
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
            <label className="form-label">Photograph</label>
            <input
              type="file"
              name="photograph"
              id="photograph"
              className="form-control bg-light"
              onChange={handleFileChange}
            />
          </div>
          <div className="col-12 overflow-x-scroll">
            <div>Educational Qualification</div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th className="text-center">Examination</th>
                  <th className="text-center">School Name</th>
                  <th className="text-center">Board/University</th>
                  <th className="text-center">Passing Year</th>
                  <th className="text-center">Stream</th>
                  <th className="text-center">Total Marks</th>
                  <th className="text-center">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Class 10</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_school_name"
                      id="highschool_school_name"
                      value={formdata.highschool_school_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_board_university"
                      id="highschool_board_university"
                      value={formdata.highschool_board_university}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_year_of_passing"
                      id="highschool_year_of_passing"
                      value={formdata.highschool_year_of_passing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_stream"
                      id="highschool_stream"
                      value={formdata.highschool_stream}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_marks_obtained"
                      id="highschool_marks_obtained"
                      value={formdata.highschool_marks_obtained}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="highschool_marks_in_pertentage"
                      id="highschool_marks_in_pertentage"
                      value={formdata.highschool_marks_in_pertentage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Class 12</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_school_name"
                      id="intermediate_school_name"
                      value={formdata.intermediate_school_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_board_university"
                      id="intermediate_board_university"
                      value={formdata.intermediate_board_university}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_year_of_passing"
                      id="intermediate_year_of_passing"
                      value={formdata.intermediate_year_of_passing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_stream"
                      id="intermediate_stream"
                      value={formdata.intermediate_stream}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_marks_obtained"
                      id="intermediate_marks_obtained"
                      value={formdata.intermediate_marks_obtained}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="intermediate_marks_in_pertentage"
                      id="intermediate_marks_in_pertentage"
                      value={formdata.intermediate_marks_in_pertentage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Diploma</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_school_name"
                      id="diploma_school_name"
                      value={formdata.diploma_school_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_board_university"
                      id="diploma_board_university"
                      value={formdata.diploma_board_university}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_year_of_passing"
                      id="diploma_year_of_passing"
                      value={formdata.diploma_year_of_passing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_stream"
                      id="diploma_stream"
                      value={formdata.diploma_stream}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_marks_obtained"
                      id="diploma_marks_obtained"
                      value={formdata.diploma_marks_obtained}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="diploma_marks_in_pertentage"
                      id="diploma_marks_in_pertentage"
                      value={formdata.diploma_marks_in_pertentage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Graduation</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_school_name"
                      id="graduation_school_name"
                      value={formdata.graduation_school_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_board_university"
                      id="graduation_board_university"
                      value={formdata.graduation_board_university}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_year_of_passing"
                      id="graduation_year_of_passing"
                      value={formdata.graduation_year_of_passing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_stream"
                      id="graduation_stream"
                      value={formdata.graduation_stream}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_marks_obtained"
                      id="graduation_marks_obtained"
                      value={formdata.graduation_marks_obtained}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="graduation_marks_in_pertentage"
                      id="graduation_marks_in_pertentage"
                      value={formdata.graduation_marks_in_pertentage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Others</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_school_name"
                      id="others_school_name"
                      value={formdata.others_school_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_board_university"
                      id="others_board_university"
                      value={formdata.others_board_university}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_year_of_passing"
                      id="others_year_of_passing"
                      value={formdata.others_year_of_passing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_stream"
                      id="others_stream"
                      value={formdata.others_stream}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_marks_obtained"
                      id="others_marks_obtained"
                      value={formdata.others_marks_obtained}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="others_marks_in_pertentage"
                      id="others_marks_in_pertentage"
                      value={formdata.others_marks_in_pertentage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
              <th>Status</th>
              <th>Roll Number</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Mother's Name</th>
              <th>Father's Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Category</th>
              <th>UID Number</th>
              <th>Nationality</th>
              <th>Religion</th>
              <th>Corresponding Address</th>
              <th>Corresponding City</th>
              <th>Corresponding State</th>
              <th>Corresponding Pincode</th>
              <th>Permanent Address</th>
              <th>Permanent City</th>
              <th>Permanent State</th>
              <th>Permanent Pincode</th>
              <th>Father's Contact</th>
              <th>Mother's Contact</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Whatsapp</th>
              <th>Alternate Contact</th>
              <th>Photograph</th>
              <th>HS School</th>
              <th>HS Board</th>
              <th>HS Passing Year</th>
              <th>HS Stream</th>
              <th>HS Marks</th>
              <th>HS %</th>
              <th>Inter School</th>
              <th>Inter Board</th>
              <th>Inter Passing Year</th>
              <th>Inter Stream</th>
              <th>Inter Marks</th>
              <th>Inter %</th>
              <th>Diploma School</th>
              <th>Diploma Board</th>
              <th>Diploma Passing Year</th>
              <th>Diploma Stream</th>
              <th>Diploma Marks</th>
              <th>Diploma %</th>
              <th>Graduation School</th>
              <th>Graduation Board</th>
              <th>Graduation Year</th>
              <th>Graduation Stream</th>
              <th>Graduation Marks</th>
              <th>Graduation %</th>
              <th>Others School</th>
              <th>Others Board</th>
              <th>Others Year</th>
              <th>Others Stream</th>
              <th>Others Marks</th>
              <th>Others %</th>
              <th>Date Added</th>
              <th>Time Added</th>
              <th>Added By Name</th>
            </tr>
          </thead>
          <tbody>
            {admissions.length === 0 ? (
              <tr>
                <td colSpan="66" className="text-center">
                  No admissions yet.
                </td>
              </tr>
            ) : (
              admissions.map((a, i) => (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.status}</td>
                  <td>{a.rollnumber}</td>
                  <td>{a.fname}</td>
                  <td>{a.mname}</td>
                  <td>{a.lname}</td>
                  <td>{a.mother_name}</td>
                  <td>{a.father_name}</td>
                  <td>{a.dob}</td>
                  <td>{a.gender}</td>
                  <td>{a.caste_category}</td>
                  <td>{a.uid_number}</td>
                  <td>{a.nationality}</td>
                  <td>{a.religion}</td>
                  <td>{a.corresponding_address}</td>
                  <td>{a.corresponding_city}</td>
                  <td>{a.corresponding_state}</td>
                  <td>{a.corresponding_pincode}</td>
                  <td>{a.permanent_address}</td>
                  <td>{a.permanent_city}</td>
                  <td>{a.permanent_state}</td>
                  <td>{a.permanent_pincode}</td>
                  <td>{a.contact_number_father}</td>
                  <td>{a.contact_number_mother}</td>
                  <td>{a.contact}</td>
                  <td>{a.email}</td>
                  <td>{a.whatsapp_number}</td>
                  <td>{a.alternate_number}</td>
                  <td>
                    {a.photograph ? (
                      <img
                        src={API_PATH + `/assets/img/student/${a.photograph}`}
                        alt="Photo"
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{a.highschool_school_name}</td>
                  <td>{a.highschool_board_university}</td>
                  <td>{a.highschool_year_of_passing}</td>
                  <td>{a.highschool_stream}</td>
                  <td>{a.highschool_marks_obtained}</td>
                  <td>{a.highschool_marks_in_pertentage}</td>
                  <td>{a.intermediate_school_name}</td>
                  <td>{a.intermediate_board_university}</td>
                  <td>{a.intermediate_year_of_passing}</td>
                  <td>{a.intermediate_stream}</td>
                  <td>{a.intermediate_marks_obtained}</td>
                  <td>{a.intermediate_marks_in_pertentage}</td>
                  <td>{a.diploma_school_name}</td>
                  <td>{a.diploma_board_university}</td>
                  <td>{a.diploma_year_of_passing}</td>
                  <td>{a.diploma_stream}</td>
                  <td>{a.diploma_marks_obtained}</td>
                  <td>{a.diploma_marks_in_pertentage}</td>
                  <td>{a.graduation_school_name}</td>
                  <td>{a.graduation_board_university}</td>
                  <td>{a.graduation_year_of_passing}</td>
                  <td>{a.graduation_stream}</td>
                  <td>{a.graduation_marks_obtained}</td>
                  <td>{a.graduation_marks_in_pertentage}</td>
                  <td>{a.others_school_name}</td>
                  <td>{a.others_board_university}</td>
                  <td>{a.others_year_of_passing}</td>
                  <td>{a.others_stream}</td>
                  <td>{a.others_marks_obtained}</td>
                  <td>{a.others_marks_in_pertentage}</td>
                  <td>{a.date_added}</td>
                  <td>{a.time_added}</td>
                  <td>{a.added_by_name}</td>
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
