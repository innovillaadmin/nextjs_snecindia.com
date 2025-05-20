"use client";
import NavLi from "./NavLi";
import style from "./header.module.css";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

import { AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import { useEffect, useState } from "react";
import { LS_USERROLE } from "@/app/config";
import { usePathname } from "next/navigation";

const NavSwitch = () => {
  const [userrole, setuserrole] = useState("");
  const pathname = usePathname();

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setuserrole(localStorage.getItem(LS_USERROLE));
  }, [pathname]);

  switch (userrole) {
    case "admin":
      return (
        <>
          <li className={style.li_single}>
            <Link href={"/manage/room-config"}>
              <IoHomeOutline className="base-gradient p-1 text-dark rounded fs-4" />{" "}
              Dashboard
            </Link>
          </li>
          <NavLi
            title="Account"
            icon={<VscAccount className="text-dark" />}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "resetpassword",
                name: "Reset Password",
                link: "/manage/password-reset",
              },
              {
                id: "manageuser",
                name: "Manage User",
                link: "/manage/manage-user",
              },
              {
                id: "adduser",
                name: "Add User",
                link: "/manage/add-user",
              },
            ]}
          />
          <NavLi
            title="Manage"
            icon={<AiOutlineShoppingCart className="text-dark" />}
            index={1} // Ensure index is defined
            isOpen={openIndex === 1}
            onToggle={() => handleToggle(1)}
            navlinks={[
              {
                id: "manage_booking",
                name: "Manage Booking",
                link: "/manage/order-history",
              },
              {
                id: "contact_requests",
                name: "Contact Requests",
                link: "/manage/contact-requests",
              },
              {
                id: "Mail_subscribers",
                name: "Email Subscribers",
                link: "/manage/email-subscribers",
              },
            ]}
          />
          {/* <li className={style.li_single}>
            <Link href={"/manage/order-history"}>
              <AiOutlineShoppingCart className="base-gradient p-1 text-dark rounded fs-4" />{" "}
              Manage Bookings
            </Link>
          </li> */}
          <li className={style.li_single}>
            <Link href={"/logout"}>
              <AiOutlineLogout className="base-gradient p-1 text-dark rounded fs-4" />{" "}
              Logout
            </Link>
          </li>
        </>
      );
    case "customer":
      return (
        <>
          <li className={style.li_single}>
            <Link href={"/rooms"}>
              <FaPeopleCarryBox className="base-gradient p-1 text-dark rounded fs-4" />{" "}
              Book Rooms
            </Link>
          </li>

          <NavLi
            title="Orders"
            icon={<MdOutlineInventory className="text-dark" />}
            index={4} // Ensure index is defined
            isOpen={openIndex === 4}
            onToggle={() => handleToggle(4)}
            navlinks={[
              {
                id: "Cart",
                name: "Cart",
                link: "/manage/cart",
              },
              {
                id: "orderhistory",
                name: "Order History",
                link: "/manage/user-order-history",
              },
            ]}
          />
          <NavLi
            title="Account"
            icon={<MdOutlineSwitchAccount className="text-dark" />}
            index={5} // Ensure index is defined
            isOpen={openIndex === 5}
            onToggle={() => handleToggle(5)}
            navlinks={[
              {
                id: "profile",
                name: "User Profile",
                link: "/manage/user-profile",
              },
              {
                id: "resetpassword",
                name: "Reset Password",
                link: "/manage/password-reset",
              },
            ]}
          />
          <li className={style.li_single}>
            <Link href={"/logout"}>
              <AiOutlineLogout className="base-gradient p-1 text-dark rounded fs-4" />{" "}
              Logout
            </Link>
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
      break;
  }
};

export default NavSwitch;
