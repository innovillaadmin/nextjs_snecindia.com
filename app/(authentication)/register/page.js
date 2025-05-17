"use client";
import { API_PATH, SITENAME } from "@/app/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const page = () => {
  const [alert, setAlert] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const router = useRouter();

  const [formdata, setformdata] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    contactnumber: "",
    email: "",
    password: "",
    verifypassword: "",
  });
  const handleRegistration = useCallback(
    (e) => {
      e.preventDefault();
      scrollTo(0, 0);

      if (formdata.password !== formdata.verifypassword) {
        setAlert("Password does not match");
        setAlertClass("alert alert-danger");
        setTimeout(() => {
          setAlert("");
          setAlertClass("");
        }, 2000);
        return;
      }
      if (
        formdata.firstname === "" ||
        formdata.lastname === "" ||
        formdata.contactnumber === "" ||
        formdata.email === "" ||
        formdata.password === "" ||
        formdata.verifypassword === ""
      ) {
        setAlert("Please fill all the fields");
        setAlertClass("alert alert-danger");
        setTimeout(() => {
          setAlert("");
          setAlertClass("");
        }, 2000);
        return;
      }
      axios
        .post(API_PATH + "Auth.php", {
          action: "userRegistration",
          firstname: formdata.firstname,
          middlename: formdata.middlename,
          lastname: formdata.lastname,
          contactnumber: formdata.contactnumber,
          email: formdata.email,
          password: formdata.password,
          verifypassword: formdata.verifypassword,
        })
        .then((res) => {
          if (res.data.status !== "success") {
            setAlert(res.data.error);
            setAlertClass("alert alert-danger");
          } else {
            setAlert("Registered Successfully. Redirecting to login page....");
            setAlertClass("alert alert-success");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        });
    },
    [formdata]
  );

  const handleinputchange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="mh-90">
      <div className="container mt-5">
        {alert && <div className={alertClass}>{alert}</div>}
        <div className="rounded p-2 bg-white shadow">
          <div className="row m-0">
            <div className="col-md-6 base-gradient rounded mt-2 mb-2 order-2 order-md-1 d-flex flex-column justify-content-center">
              <div className="text-center text-white fs-1 pt-5 pb-5">
                <Image
                  className="shadow rounded-circle border border-white border-3"
                  src="/assets/img/sslogo.png"
                  width={150}
                  height={150}
                  alt="Logo for site"
                />
                <div className="pt-2 pb-2 bebas-neue-regular">{SITENAME}</div>
              </div>
            </div>
            <div className="col-md-6 mt-2 mb-2 order-1 order-md-2">
              <h2 className="text-base m-0">Create Account</h2>
              <div className="base-gradient p-1 rounded mt-2"></div>
              <small className="text-base">
                Complete the form to get registered as user.
              </small>
              <form>
                <div className="mt-3">
                  <label htmlFor="logininput" className="text-base">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formdata.firstname}
                    onChange={handleinputchange}
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="logininput" className="text-base">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middlename"
                    className="form-control"
                    name="middlename"
                    value={formdata.middlename}
                    onChange={handleinputchange}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="logininput" className="text-base">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="form-control"
                    name="lastname"
                    value={formdata.lastname}
                    onChange={handleinputchange}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="logininput" className="text-base">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactnumber"
                    name="contactnumber"
                    value={formdata.contactnumber}
                    onChange={handleinputchange}
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="logininput" className="text-base">
                    Enter Login Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleinputchange}
                    className="form-control"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="current-password" className="text-base">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleinputchange}
                    className="form-control"
                    autoComplete="current-password"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="current-password" className="text-base">
                    Verify Password
                  </label>
                  <input
                    type="password"
                    id="verifypassword"
                    name="verifypassword"
                    value={formdata.verifypassword}
                    onChange={handleinputchange}
                    className="form-control"
                    autoComplete="verify-password"
                  />
                </div>
                <div className="mt-3">
                  <button
                    id="btnloginauth"
                    className="btn base-gradient text-dark"
                    onClick={handleRegistration}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
