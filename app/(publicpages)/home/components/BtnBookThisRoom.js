"use client";
import { API_PATH, LS_USERID, LS_USERNAME, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const BtnBookThisRoom = (props) => {
  const [alertdanger, setalertdanger] = useState("");
  const [alertsuccess, setalertsuccess] = useState("");
  const [formstatus, setformstatus] = useState("hidden");
  const [bookingtotal, setbookingtotal] = useState(0);
  const [totalstay, settotalstay] = useState(0);
  const [checkInDate, setcheckInDate] = useState("");
  const [checkInTime, setcheckInTime] = useState("");
  const [checkOutDate, setcheckOutDate] = useState("");
  const [checkOutTime, setcheckOutTime] = useState("");
  const [adultcount, setadultcount] = useState(1);
  const [minorcount, setminorcount] = useState(0);
  const [roomdata, setroomdata] = useState([]);

  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getroominfofromdb",
        roomid: props.roomid,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setroomdata(r.data.retval);
          props.setroomdata(r.data.retval);
          // setroomrate(r.data.retval.offer_price);
        }
      });
  }, []);

  const calculateStayDays = useCallback(
    (checkInDate, checkInTime, checkOutDate, checkOutTime) => {
      if (!checkInDate || !checkInTime || !checkOutDate || !checkOutTime) {
        setbookingtotal(0);
        return;
      }

      const checkIn = combineDateAndTime(checkInDate, checkInTime);
      const checkOut = combineDateAndTime(checkOutDate, checkOutTime);

      // Calculate the difference in time (milliseconds)
      const diffTime = checkOut.getTime() - checkIn.getTime();

      // Convert the time difference to days, then round up to the nearest full day
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      settotalstay(diffDays);

      setbookingtotal(Number(diffDays) * Number(roomdata.offer_price));
    },
    [roomdata.offer_price]
  );

  // Use useEffect to trigger calculation whenever the date or time changes
  useEffect(() => {
    calculateStayDays(checkInDate, checkInTime, checkOutDate, checkOutTime);
  }, [checkInDate, checkInTime, checkOutDate, checkOutTime]);

  const bookthisroom = useCallback(() => {
    // Check if check-in and check-out times are valid (must be after now)
    if (localStorage.getItem(LS_USERTOKEN)) {
      if (checkInDate && checkOutDate) {
        // Ensure that total stay is calculated before making the API request
        calculateStayDays(checkInDate, checkInTime, checkOutDate, checkOutTime);

        axios
          .post(API_PATH + "ManageHotel.php", {
            action: "addroomtocart",
            userid: localStorage.getItem(LS_USERID),
            username: localStorage.getItem(LS_USERNAME),
            usertoken: localStorage.getItem(LS_USERTOKEN),
            roomname: roomdata.name,
            maxprice: roomdata.max_price,
            offerprice: roomdata.offer_price,
            bookingtotal: bookingtotal,
            checkInDate,
            totalstay: totalstay,
            checkInTime,
            checkOutDate,
            checkOutTime,
            adultcount,
            minorcount,
            roomid: props.roomid,
          })
          .then((r) => {
            if (r.data.status === "success") {
              setalertdanger("");
              setalertsuccess(
                "Details added to cart, please proceed to checkout."
              );
              setformstatus("hidden");
              setbookingtotal(0);
              settotalstay(0);
              setcheckInDate("");
              setcheckInTime("");
              setcheckOutDate("");
              setcheckOutTime("");
              setadultcount(0);
              setminorcount(0);
            } else {
              if (r.data.err === "booked") {
                setalertsuccess("");
                setalertdanger("Sorry! the room is not available now.");
              }
            }
          });
      } else {
        setalertdanger(
          "Please check dates, check in and out date can not be lower than today's date."
        );
        setTimeout(() => {
          setalertdanger("");
        }, 6000);
      }
    } else {
      setalertdanger(
        "Please login to book this room. If not already registered, please register."
      );
      setTimeout(() => {
        setalertdanger("");
      }, 6000);
    }
  }, [
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    totalstay,
    bookingtotal,
    calculateStayDays,
  ]);

  const combineDateAndTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  const toggleForm = useCallback(() => {
    if (formstatus === "hiddedn") {
      setformstatus("show");
    } else {
      setformstatus("hidden");
    }
  }, []);

  return (
    <>
      {formstatus === "hidden" ? (
        <div>
          <button
            className="btn btn-dark "
            onClick={() => {
              formstatus === "hidden"
                ? setformstatus("show")
                : setformstatus("hidden");
            }}
          >
            Book This Room
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-dark form-control">
            Total: Rs {bookingtotal}
          </button>
        </div>
      )}
      {alertdanger !== "" && (
        <div className="alert alert-danger mt-2">{alertdanger}</div>
      )}
      {alertsuccess !== "" && (
        <div>
          <div className="alert alert-success mt-2">{alertsuccess}</div>
          <div>
            <Link href={"/manage/cart"}>
              <button type="submit" className="btn btn-warning">
                Go to Cart
              </button>
            </Link>
          </div>
        </div>
      )}
      {formstatus !== "hidden" && (
        <div className="row mt-2">
          <div className="col-6">
            <label htmlFor="" className="text-dark">
              Adult Count
            </label>
            <select
              name=""
              value={adultcount}
              onChange={(e) => setadultcount(e.target.value)}
              className="form-control"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="" className="text-dark">
              Minor Count
            </label>
            <select
              name=""
              value={minorcount}
              onChange={(e) => setminorcount(e.target.value)}
              className="form-control"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="checkindate" className="text-dark">
              Check In Date
            </label>
            <input
              type="date"
              name="checkindate"
              value={checkInDate}
              onChange={(e) => setcheckInDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="text-dark">
              Check In Time (Starts at 12Pm)
            </label>
            <input
              type="time"
              name=""
              value={checkInTime}
              onChange={(e) => setcheckInTime(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="text-dark">
              Check Out Date
            </label>
            <input
              type="date"
              name=""
              value={checkOutDate}
              onChange={(e) => setcheckOutDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="text-dark">
              Out Time (Max by 11 Am)
            </label>
            <input
              type="time"
              name=""
              value={checkOutTime}
              onChange={(e) => setcheckOutTime(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <button className="btn btn-danger mt-2 w-100" onClick={toggleForm}>
              Close Form
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-dark mt-2 w-100" onClick={bookthisroom}>
              Add Booking
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BtnBookThisRoom;
