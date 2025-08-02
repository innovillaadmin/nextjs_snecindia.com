"use client";
import React, { useEffect, useState } from "react";
import Hero from "../Hero";
import FooterPublic from "@/app/component/FooterPublic";
import Newsletter from "../../home/Newsletter";
import { useParams } from "next/navigation";
import axios from "axios";
import { API_PATH } from "@/app/config";

const page = () => {
  const depid = useParams().id;
  const [department, setdepartment] = useState([]);
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    axios
      .post(API_PATH + "PublicRequests.php", {
        action: "getCourseStructure",
        depid: depid,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setdepartment(r.data.department);
          setcourses(r.data.course);
        }
      });
  }, [depid]);
  return (
    <div>
      <Hero />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h1 className="display-5 fw-bold text-capitalize">
              {department.name}
            </h1>
          </div>
        </div>

        <div className="mb-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Duration</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.course_code}</td>
                    <td>{d.duration}</td>
                    <td>{d.eligibility}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Newsletter />
      <FooterPublic />
    </div>
  );
};

export default page;
