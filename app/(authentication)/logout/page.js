"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LS_USERID } from "@/app/config";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.clear();
    if (!localStorage.getItem(LS_USERID)) {
      router.push("login");
    }
  }, []);
  return (
    <div className="mh-90">
      <div className="text-center" style={{ marginTop: "35vh" }}>
        <h1>Logging out ........</h1>
        <div className="spinner-border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
