import axios from "axios";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "./config";

export const fetchDepartments = async () => {
  try {
    const response = await axios.post(API_PATH + "ManageEducation.php", {
      action: "getDepartments",
      userid: localStorage.getItem(LS_USERID),
      usertoken: localStorage.getItem(LS_USERTOKEN),
    });

    if (response.data.status === "success") {
      return response.data.retval; // Return department list
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
export const fetchCourses = async () => {
  try {
    const response = await axios.post(API_PATH + "ManageEducation.php", {
      action: "getCourses",
      userid: localStorage.getItem(LS_USERID),
      usertoken: localStorage.getItem(LS_USERTOKEN),
    });

    if (response.data.status === "success") {
      return response.data.retval; // Return department list
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const fetchTableData = async ({
  table,
  where = "",
  orderby = "id desc",
  limit = "",
}) => {
  try {
    const response = await axios.post(API_PATH + "ManageEducation.php", {
      action: "getTableData",
      table,
      where,
      orderby,
      limit,
      userid: localStorage.getItem(LS_USERID),
      usertoken: localStorage.getItem(LS_USERTOKEN),
    });

    if (response.data.status === "success") {
      return response.data.retval;
    } else {
      console.warn("Fetch failed:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
