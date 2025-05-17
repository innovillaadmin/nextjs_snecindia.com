"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const DataComponent = (props) => {
  const [fname, setfname] = useState("");
  const [mname, setmname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [actvalue, setactvalue] = useState("");

  const action = (e) => {
    e.preventDefault();
    let delid = e.target.id;
    let actval = e.target.value;

    switch (actval) {
      case "delete":
        axios
          .post(API_PATH + "ManageUser.php", {
            action: "deleteuserbyid",
            userid: localStorage.getItem(LS_USERID),
            usertoken: localStorage.getItem(LS_USERTOKEN),
            delid: delid,
          })
          .then((r) => {
            if (r.data.status === "success") {
              props.alertclass("alert alert-success");
              props.alert("User deleted successfully");
            } else {
              props.alertclass("alert alert-danger");
              props.alert("Unable to get data, please try again.");
            }
          });
        break;

      case "save":
        axios
          .post(API_PATH + "ManageUser.php", {
            action: "updateuserinfo",
            userid: localStorage.getItem(LS_USERID),
            usertoken: localStorage.getItem(LS_USERTOKEN),
            id: e.target.id,
            fname,
            mname,
            lname,
            email,
            contact,
            newpassword,
            address,
            city,
            state,
            pincode,
          })
          .then((r) => {
            if (r.data.status === "success") {
              props.alertclass("alert alert-success");
              props.alert("User updated successfully");
            } else {
              props.alertclass("alert alert-danger");
              props.alert("Unable to get data, please try again.");
            }
          });
        break;

      default:
        break;
    }

    setactvalue("");
  };

  return (
    <tr key={props.d.id}>
      <td className="p-1">
        <select
          className="form-control  mw-90 mw-90"
          id={props.d.id}
          value={actvalue}
          onChange={action}
        >
          <option value="">Select</option>
          <option value="save">Save</option>
          <option value="delete">Delete</option>
        </select>
      </td>
      <td className="p-1 ">{props.d.id}</td>
      <td className="p-1 rounded ">
        <input
          type="text"
          defaultValue={props.d.fname}
          onChange={(e) => setfname(e.target.value)}
          className="form-control  mw-90 border bg-white"
          style={{ width: "100%" }}
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          defaultValue={props.d.mname}
          onChange={(e) => setmname(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          defaultValue={props.d.lname}
          onChange={(e) => setlname(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.useremail}
          onChange={(e) => setemail(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.usercontact}
          onChange={(e) => setcontact(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.userrole}
          className="form-control  mw-90 border bg-light"
          readOnly={true}
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          name=""
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.address}
          onChange={(e) => setaddress(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.city}
          onChange={(e) => setcity(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.state}
          onChange={(e) => setstate(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          defaultValue={props.d.pincode}
          onChange={(e) => setpincode(e.target.value)}
          className="form-control  mw-90 border bg-white"
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          name=""
          defaultValue={props.d.user_activation_date}
          className="form-control  mw-90 border bg-white"
          readOnly={true}
        />
      </td>
      <td className="p-1">
        <input
          type="text"
          name=""
          defaultValue={props.d.user_activation_time}
          className="form-control  mw-90 border bg-white"
          readOnly={true}
        />
      </td>
    </tr>
  );
};
const ManageUser = () => {
  const [data, setdata] = useState([]);

  // alert states
  const [alert, setalert] = useState("");
  const [alertclass, setalertclass] = useState("");

  // get user data to display
  useEffect(() => {
    axios
      .post(API_PATH + "ManageUser.php", {
        action: "getuserdatainbulk",
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        if (r.data.status === "success") {
          setdata(r.data.retval);
        } else {
          setalertclass("alert alert-danger");
          setalert("Unable to get data, please try again.");
        }
      });
  }, [alert]);

  return (
    <div className="mh-90 mb-5">
      <div className="container-fluid">
        <div className="bg-light p-2">
          <div className="pt-3 text-secondary">
            {alert && <div className={alertclass}>{alert}</div>}
            <h4
              style={{ textTransform: "uppercase" }}
              className="text-base p-2"
            >
              All users on portal
            </h4>
          </div>

          <div
            className="p-2"
            style={{ overflowX: "scroll", fontSize: "12px" }}
          >
            <table
              className="border-top border-warning border-4 rounded bg-white table table-striped table-responsive shadow"
              style={{ overflowX: "scroll", fontSize: "12px" }}
            >
              <thead>
                <tr key="">
                  <th>Action</th>
                  <th>User Sr.</th>
                  <th>Fname</th>
                  <th>M Name</th>
                  <th>L Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Profile</th>
                  <th>New Password</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <DataComponent
                      d={d}
                      alertclass={(v) => setalertclass(v)}
                      alert={(v) => setalert(v)}
                    />
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
