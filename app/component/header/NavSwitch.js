"use client";
import NavLi from "./NavLi";
import style from "./header.module.css";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import { API_PATH, LS_USERROLE } from "@/app/config";
import { usePathname } from "next/navigation";
import axios from "axios";

const NavSwitch = () => {
  const [userrole, setuserrole] = useState("");
  const [departments, setDepartments] = useState([]);
  const pathname = usePathname();

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setuserrole(localStorage.getItem(LS_USERROLE));
  }, [pathname]);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.post(API_PATH + "PublicRequests.php", {
        action: "fetchDepartments",
      });
      const formatted = response.data.retval.map((item) => ({
        id: item.id,
        name: item.name,
        link: `/courses/${item.id}`, // dynamically generate the link
      }));
      setDepartments(formatted);
    } catch (error) {
      console.error("Error fetching departments:", error);

      return [];
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  switch (userrole) {
    case "admin":
      return (
        <>
          <li className={style.li_single}>
            <Link href={"/"}>Home</Link>
          </li>
          <NavLi
            title="Education ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "Departments",
                name: "Departments",
                link: "/manage/manage-department",
              },
              {
                id: "Courses",
                name: "Courses",
                link: "/manage/manage-courses",
              },
              {
                id: "Subjects",
                name: "Subjects",
                link: "/manage/manage-subjects",
              },
              {
                id: "Franchise",
                name: "Franchise",
                link: "/manage/manage-franchise",
              },
              {
                id: "FranchiseStudyCentre",
                name: "Study Centre",
                link: "/manage/manage-study-centre",
              },
            ]}
          />
          <NavLi
            title="Admissions ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "Students",
                name: "Students",
                link: "/manage/manage-students",
              },
              {
                id: "CourseEnrollment",
                name: "Course Enrollment",
                link: "/manage/manage-course-enrollment",
              },
            ]}
          />
          <li className={style.li_single}>
            <Link href={"/logout"}>Logout</Link>
          </li>
        </>
      );
    case "franchise":
      return (
        <>
          <li className={style.li_single}>
            <Link href={"/"}>Home</Link>
          </li>
          <NavLi
            title="Introduction ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "aboutus",
                name: "About Us",
                link: "/about-us",
              },
              {
                id: "About_SNEC",
                name: "About SSNEC",
                link: "/about-snec",
              },
              {
                id: "About_The_Founder",
                name: "About The Founder",
                link: "/about-the-founder",
              },
              {
                id: "About_The_DIRECTOR",
                name: "About The Director",
                link: "/about-the-director",
              },
              {
                id: "Gallery",
                name: "Gallery",
                link: "/gallery",
              },
              {
                id: "Contact_Us",
                name: "Contact Us",
                link: "/contact-us",
              },
            ]}
          />
          <NavLi
            title="Govt Projects ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "KYP",
                name: "KYP",
                link: "/govt-projects/kvp",
              },
              {
                id: "PMKVY",
                name: "PMKVY",
                link: "/govt-projects/pmkvy",
              },
              {
                id: "Skill_India",
                name: "Skill India",
                link: "/govt-projects/skill-india",
              },
            ]}
          />
          <NavLi
            title={"Courses ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "department_of_paramedical",
                name: "Department of Paramedical",
                link: "/courses/paramedical",
              },
              {
                id: "department_of_nursing",
                name: "Department of Nursing",
                link: "/courses/nursing",
              },
              {
                id: "department_of_computer",
                name: "Department of Computer",
                link: "/courses/computer",
              },
              {
                id: "department_of_education",
                name: "Department of Education",
                link: "/courses/education",
              },
              {
                id: "department_of_veterinary",
                name: "Department of Veterinary",
                link: "/courses/veterinary",
              },
              {
                id: "department_of_agriculture",
                name: "Department of Agriculture",
                link: "/courses/agriculture",
              },
              {
                id: "department_of_yoga",
                name: "Department of Yoga",
                link: "/courses/yoga",
              },
              {
                id: "University_courses",
                name: "University Courses",
                link: "/courses/university-courses",
              },
            ]}
          />
          <NavLi
            title={"Student Zone ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "results",
                name: "Results",
                link: "/student-zone/results",
              },
              {
                id: "Cert_Verification",
                name: "Certificate Verification",
                link: "/student-zone/certificate-verification",
              },
            ]}
          />
          <NavLi
            title={"Examination ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "admit_card",
                name: "Admit Card",
                link: "/student-zone/examination/admit-card",
              },
              {
                id: "Id_card",
                name: "Id Card",
                link: "/student-zone/examination/id-card",
              },
              {
                id: "Exam_date",
                name: "Exam Date",
                link: "/student-zone/examination/exam-date",
              },
              {
                id: "Online_exam",
                name: "Online Exam",
                link: "/student-zone/examination/online-exam",
              },
            ]}
          />
          <NavLi
            title={"Centres ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "Authorized_study_centre",
                name: "Authorized Study Centre",
                link: "/centres/authorized-study-centre",
              },
              {
                id: "Authorized_Franchise",
                name: "Authorized Franchise",
                link: "/centres/authorized-franchise",
              },
              {
                id: "New_Franchise",
                name: "New Franchise",
                link: "/centres/new-franchise",
              },
              {
                id: "enquiry",
                name: "Franchise Enquiry",
                link: "/centres/franchise-enquiry",
              },
            ]}
          />
          <li className={style.li_single}>
            <Link href={"/login"}>Login</Link>
          </li>
        </>
      );
    default:
      return (
        <>
          <li className={style.li_single}>
            <Link href={"/"}>Home</Link>
          </li>
          <NavLi
            title="Introduction ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "aboutus",
                name: "About Us",
                link: "/about-us",
              },
              {
                id: "About_SNEC",
                name: "About SSNEC",
                link: "/about-snec",
              },
              {
                id: "About_The_Founder",
                name: "About The Founder",
                link: "/about-the-founder",
              },
              {
                id: "About_The_DIRECTOR",
                name: "About The Director",
                link: "/about-the-director",
              },
              {
                id: "Gallery",
                name: "Gallery",
                link: "/gallery",
              },
              {
                id: "Contact_Us",
                name: "Contact Us",
                link: "/contact-us",
              },
            ]}
          />
          <NavLi
            title="Govt Projects ▾"
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "KYP",
                name: "KYP",
                link: "/govt-projects/kvp",
              },
              {
                id: "PMKVY",
                name: "PMKVY",
                link: "/govt-projects/pmkvy",
              },
              {
                id: "Skill_India",
                name: "Skill India",
                link: "/govt-projects/skill-india",
              },
            ]}
          />
          <NavLi
            title={"Courses ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={departments ?? []}
          />
          <NavLi
            title={"Student Zone ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "results",
                name: "Results",
                link: "/student-zone/results",
              },
              {
                id: "Cert_Verification",
                name: "Certificate Verification",
                link: "/student-zone/certificate-verification",
              },
            ]}
          />
          <NavLi
            title={"Examination ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "admit_card",
                name: "Admit Card",
                link: "/student-zone/examination/admit-card",
              },
              {
                id: "Id_card",
                name: "Id Card",
                link: "/student-zone/examination/id-card",
              },
              {
                id: "Exam_date",
                name: "Exam Date",
                link: "/student-zone/examination/exam-date",
              },
              {
                id: "Online_exam",
                name: "Online Exam",
                link: "/student-zone/examination/online-exam",
              },
            ]}
          />
          <NavLi
            title={"Centres ▾"}
            icon={""}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "Authorized_study_centre",
                name: "Authorized Study Centre",
                link: "/centres/authorized-study-centre",
              },
              {
                id: "Authorized_Franchise",
                name: "Authorized Franchise",
                link: "/centres/authorized-franchise",
              },
              {
                id: "New_Franchise",
                name: "New Franchise",
                link: "/centres/new-franchise",
              },
              {
                id: "enquiry",
                name: "Franchise Enquiry",
                link: "/centres/franchise-enquiry",
              },
            ]}
          />
          <li className={style.li_single}>
            <Link href={"/login"}>Login</Link>
          </li>
        </>
      );
      break;
  }
};

export default NavSwitch;
