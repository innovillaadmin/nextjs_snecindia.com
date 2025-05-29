"use client";
import { LS_USERROLE } from "@/app/config";
import React, { useEffect, useState } from "react";
import DashboardAdmin from "./components/DashboardAdmin";

const DashboardPage = () => {
  const [dashboard, setdashboard] = useState(null);
  useEffect(() => {
    switch (localStorage.getItem(LS_USERROLE)) {
      case "admin":
        setdashboard(<DashboardAdmin />);
        break;

      default:
        break;
    }
  }, []);
  return <div className="mh-90">{dashboard ? dashboard : "Loading..."}</div>;
};

export default DashboardPage;
