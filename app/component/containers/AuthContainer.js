"use client";

import { API_PATH, LS_USERID, LS_USERROLE, LS_USERTOKEN } from "@/app/config";
import Loading from "@/app/Loading";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthContainer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loginstatus, setLoginstatus] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axios.post(API_PATH + "Auth.php", {
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          userrole: localStorage.getItem(LS_USERROLE),
          action: "validateuser",
        });

        if (response.data.status === "success") {
          setLoginstatus(true);
        } else {
          router.push("/logout");
        }
      } catch (error) {
        console.error("Error validating user:", error);
      }
    };

    if (loginstatus === false) {
      validateUser();
    }
  }, [pathname]);

  console.log(loginstatus);
  if (loginstatus === null) {
    return (
      <div>
        <Loading />
      </div>
    ); // Show a loading state until the authentication check is complete
  }

  return <>{children}</>;
};

export default AuthContainer;
