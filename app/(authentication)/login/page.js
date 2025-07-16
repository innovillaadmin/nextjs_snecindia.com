"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  API_PATH,
  LS_USERID,
  LS_USERNAME,
  LS_USERROLE,
  LS_USERTOKEN,
  SITENAME,
} from "@/app/config";
import Image from "next/image";
import Link from "next/link";
import FooterPublic from "@/app/component/FooterPublic";

const Login = () => {
  const [loginid, setLoginid] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const [alert, setAlert] = useState({ message: "", className: "" });

  const router = useRouter();

  const navSwitch = useCallback(() => {
    const userRole = localStorage.getItem(LS_USERROLE);

    if (userRole) {
      var redirectPath = "";
      if (userRole === "admin") {
        redirectPath = "/manage/dashboard";
      } else if (userRole === "student") {
        redirectPath = "/manage/student-course-enrollment";
      }

      redirectPath !== "" && router.push(redirectPath);
    }
  }, [router]);

  useEffect(() => {
    navSwitch();
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      if (!loginid || !loginpassword) {
        setAlert({
          message: "Login ID and Password are mandatory!",
          className: "alert-danger",
        });
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_PATH}Auth.php`,
          { action: "userLogin", loginid, password: loginpassword },
          { withCredentials: true }
        );

        if (data.status === "success") {
          localStorage.setItem(LS_USERID, data.userid);
          localStorage.setItem(LS_USERNAME, data.username);
          localStorage.setItem(LS_USERROLE, data.userrole);
          localStorage.setItem(LS_USERTOKEN, data.usertoken);

          setAlert({
            message: "Login successful. Redirecting...",
            className: "alert-success",
          });

          if (localStorage.getItem(LS_USERTOKEN)) {
            setTimeout(navSwitch, 1500); // Shortened delay for faster redirect
          }
        } else {
          setAlert({
            message: "Invalid Login ID or Password!",
            className: "alert-danger",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setAlert({
          message: "An error occurred during login.",
          className: "alert-danger",
        });
      }
    },
    [loginid, loginpassword, navSwitch]
  );

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <>
      <div className="mh-90">
        <div className="container mt-5 ">
          {alert.message && (
            <div className={`alert ${alert.className}`}>{alert.message}</div>
          )}
          <div className="rounded p-2 bg-white shadow">
            <div className="row m-0">
              <div className="col-md-6 base-gradient rounded mt-2 mb-2 order-2 order-md-1">
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
                <h2 className="text-base m-0">Login</h2>
                <div className="base-gradient p-1 rounded mt-2"></div>
                <small className="text-base">
                  Enter your ID and password to log in to your account.
                </small>
                <form onSubmit={handleLogin}>
                  <div className="mt-3">
                    <label htmlFor="logininput" className="text-base">
                      Enter Login ID
                    </label>
                    <input
                      type="text"
                      id="logininput"
                      className="form-control"
                      value={loginid}
                      onChange={handleChange(setLoginid)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="current-password" className="text-base">
                      Enter Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="form-control"
                      autoComplete="current-password"
                      value={loginpassword}
                      onChange={handleChange(setLoginpassword)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn base-gradient text-dark"
                    >
                      Login
                    </button>
                    <Link href="/register">
                      <button
                        type="button"
                        className="ms-3 btn base-gradient text-dark"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPublic />
    </>
  );
};

export default Login;
