"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const RoomConfig = (p) => {
  const [roomname, setroomname] = useState(p.d.name || "");
  const [maxprice, setmaxprice] = useState(p.d.max_price || "");
  const [currentprice, setcurrentprice] = useState(p.d.offer_price || "");

  const saveconfig = (e) => {
    e.preventDefault();
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "updateroomconfig",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        updateid: e.target.id,
        roomname,
        maxprice,
        currentprice,
      })
      .then((r) => {
        r.data.status === "success" ? p.alert("success") : p.alert("failed");
      });
  };

  return (
    <tr key={p.i}>
      <td className="p-1 rounded">
        <Link href={"/manage/room-config/" + p.d.roomid}>
          <button
            type="submit"
            className="btn bg-white text-dark shadow border"
            id={p.d.roomid}
          >
            Manage
          </button>
        </Link>
      </td>
      <td className="p-1 rounded">
        <button
          type="submit"
          className="btn btn-warning text-dark border"
          onClick={saveconfig}
          id={p.d.roomid}
        >
          Save
        </button>
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={p.d.room_name}
          onChange={(e) => setroomname(e.target.value)}
          className="form-control border bg-white"
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={p.d.max_price}
          onChange={(e) => setmaxprice(e.target.value)}
          className="form-control border bg-white"
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={p.d.offer_price}
          onChange={(e) => setcurrentprice(e.target.value)}
          className="form-control border bg-white"
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={
            p.d.booking_status === "closed" ? "Available" : p.d.booking_status
          }
          className="form-control border bg-white"
          readOnly={true}
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={p.d.booking_status === "closed" ? "" : p.d.booked_from}
          className="form-control border bg-white"
          readOnly={true}
        />
      </td>
      <td className="p-1 rounded">
        <input
          type="text"
          name=""
          defaultValue={p.d.booking_status === "closed" ? "" : p.d.booked_till}
          className="form-control border bg-white"
          readOnly={true}
        />
      </td>
    </tr>
  );
};

const page = () => {
  const [rooms, setrooms] = useState([]);
  const [alert, setalert] = useState("");
  const getroominfo = useCallback(async () => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getroomsdata",
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        r.data.status === "success" ? setrooms(r.data.retval) : setrooms([]);
      });
  }, []);

  useEffect(() => {
    getroominfo();
  }, []);
  return (
    <div className="mh-90">
      <div className="container mt-1 p-0">
        {alert === "success" && (
          <div className="alert alert-success">Update Successful!</div>
        )}
        {alert === "failed" && (
          <div className="alert alert-success">
            Something went wrong, please try again later!
          </div>
        )}
      </div>
      <div className="container pt-2 base-gradient shadow mt-5 mt-md-3 p-0">
        <div className="px-md-5 bg-white py-md-3 border  mb-5 ">
          <h4>Manage Room Configuration</h4>
          <div className="overflow-auto">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Update</th>
                  <th>Name</th>
                  <th>Max Price</th>
                  <th>Current Price</th>
                  <th>Booking Status</th>
                  <th>Booked From</th>
                  <th>Booked Till</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((d, i) => {
                  return (
                    <RoomConfig
                      d={d}
                      i={i}
                      key={i}
                      alert={(v) => setalert(v)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
