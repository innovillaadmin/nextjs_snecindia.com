"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const NavLi = (props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Handle menu toggle logic
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Handle closing the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle closing the menu when the pathname changes
  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [props.isOpen, pathname]);

  return (
    <li
      ref={navRef}
      onClick={handleToggle}
      className={isOpen ? "menu-open" : ""}
    >
      {props.icon !== "" && (
        <span className="base-gradient pb-1 ps-1 pe-1 rounded">
          {props.icon}
        </span>
      )}
      <span style={{ cursor: "pointer" }}>{props.title}</span>
      <ul
        className={isOpen ? "d-block" : "d-none"}
        style={{ padding: "5px 0px", backgroundColor: "#fbfbfb" }}
      >
        {props.navlinks.map((d) => (
          <li key={d.id}>
            <Link href={d.link}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavLi;
