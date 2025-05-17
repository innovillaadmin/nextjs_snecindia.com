"use client";
import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import { AiOutlineClose, AiOutlineMenuFold } from "react-icons/ai";
import { LS_USERROLE, SITENAME } from "../../config";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavSwitch from "./NavSwitch";

const Header = () => {
  const pathname = usePathname();
  const [toggle, settoggle] = useState("d-none");
  const [logolink, setlogolink] = useState("/manage/dashboard");
  const [userrole, setuserrole] = useState("");

  const togglenav = () => {
    if (toggle === "d-none") {
      settoggle("d-block");
    } else {
      settoggle("d-none");
    }
  };

  useEffect(() => {
    settoggle("d-none");
    // check for logged in routes on toggle
  }, [pathname]);

  return (
    <>
      {/* Topbar */}
      <div className={style.header + " border-bottom pt-1 pb-1 shadow"}>
        {/* logo and branding div */}
        <div className="ms-2">
          <Link
            href={userrole === "admin" ? "/manage/dashboard" : "/"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>
              <Image
                className="shadow bg-white"
                src={"/assets/img/sslogo.png"}
                width={48}
                height={48}
                alt="Logo for SNECINDIA"
                style={{
                  position: "absolute",
                  top: 1,
                  zIndex: 999,
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="pt-1 text-dark">
              <span
                style={{ fontWeight: "bold", marginLeft: 55, fontSize: 25 }}
              >
                {SITENAME}
              </span>
            </div>
          </Link>
        </div>
        {/* logo and branding div end */}

        {/* Centeral div */}
        <div className="text-center pe-2 d-none d-md-block">
          <ul className={style.topbarurl}>
            <NavSwitch />
          </ul>
        </div>
        {/* Centeral div end */}

        {/* right justified content and navigation */}
        <div className="m-0 p-0 pt-2 d-md-none">
          <span className="m-0 base-gradient me-2 rounded p-2">
            <AiOutlineMenuFold className="text-dark fs-3" onClick={togglenav} />
          </span>
        </div>
        {/* right justified content and navigation end */}
      </div>
      {/* Topbar End */}

      {/* Sidebar */}
      <div
        className={[style.sidebar, toggle, "border border-end shadow"].join(
          " "
        )}
      >
        {/* Sidebar Close Button */}
        <div className={style.headerclosebtn} onClick={togglenav}>
          <span className="base-gradient pb-1 ps-1 pe-1 rounded">
            <AiOutlineClose className="p-0 m-0  text-dark" />
          </span>
        </div>
        {/* Sidebar Close Button End */}
        {/* sidebar navigation links  */}
        <ul className={style.sidebarul}>
          <NavSwitch />
        </ul>

        {/* sidebar navigation links end */}
      </div>
      {/* Sidebar End */}
    </>
  );
};

export default Header;
