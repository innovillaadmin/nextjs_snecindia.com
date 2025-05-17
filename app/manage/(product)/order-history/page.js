"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const page = () => {
  const [orderfilter, setorderfilter] = useState("new");
  const [data, setdata] = useState([]);
  const [counter, setcounter] = useState(0);

  const router = useRouter();

  const statusswitch = useCallback((key) => {
    if (key !== "new") {
      setorderfilter("old");
    } else {
      setorderfilter("new");
    }
  }, []);

  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getbookinghistory",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        orderfilter,
      })
      .then((r) => {
        r.data.status === "success" ? setdata(r.data.retval) : setdata([]);
      });
  }, [orderfilter, counter]);

  const handleaction = useCallback((e) => {
    if (e.target.value === "close") {
      router.push("/manage/room-config/" + e.target.id);
    } else if (e.target.value === "reject") {
      if (confirm("Are you sure you want to proceed?")) {
        axios
          .post(API_PATH + "ManageHotel.php", {
            action: "rejectbookingfromcustomer",
            usertoken: localStorage.getItem(LS_USERTOKEN),
            bookingid: e.target.dataset.bookingid,
          })
          .then((r) => {
            r.data.status === "success" && setcounter(Number(counter) + 1);
          });
      }
    }
  }, []);

  return (
    <div className="mh-90">
      <div className="container">
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <h6 className="text-bold p-2">Booking History</h6>
          </div>
          <div>
            <button
              className="btn btn-warning"
              onClick={() => statusswitch("new")}
            >
              New Booking
            </button>
            <button
              className="btn btn-warning ms-1"
              onClick={() => statusswitch("old")}
            >
              Previous Booking
            </button>
          </div>
        </div>
        <div className="mt-3 border-top border-warning border-2 overflow-x-scroll">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Action.</th>
                <th>Booking SR.</th>
                <th>Customer Name</th>
                <th>Check In Date</th>
                <th>Check In Time</th>
                <th>Check Out Date</th>
                <th>Check Out Time</th>
                <th>Room</th>
                <th>MRP</th>
                <th>Booking Price</th>
                <th>Person Count</th>
                <th>Adult Count</th>
                <th>Minor Count</th>
                <th>Total Stay Days</th>
                <th>Total Due</th>
                <th>Other Expense</th>
                <th>Additional Charges</th>
                <th>Dicount</th>
                <th>Total Payable</th>
                <th>Total Paid</th>
                <th>Balance Amount</th>
                <th>Pay Mode</th>
                <th>Pay Date</th>
                <th>Pay Ref Id</th>
                <th>Pay Time</th>
                <th>Order Id</th>
                <th>Order Status</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>
                      {d.order_status === "generated" ? (
                        <select
                          onChange={handleaction}
                          id={d.room_id}
                          data-bookingid={d.id}
                        >
                          <option value=""></option>
                          {/* <option value="accept">Accept Booking</option> */}
                          <option value="close">Close Booking</option>
                          <option value="reject">Reject Booking</option>
                        </select>
                      ) : (
                        <div className="alert alert-danger p-1 text-center text-capitalize">
                          {d.order_status}
                        </div>
                      )}
                    </td>
                    <td>{d.id}</td>
                    <td>{d.user_name}</td>
                    <td>{d.check_in_date}</td>
                    <td>{d.check_in_time}</td>
                    <td>{d.check_out_date}</td>
                    <td>{d.check_out_time}</td>
                    <td>{d.room_name}</td>
                    <td>{d.max_price}</td>
                    <td>{d.booking_price}</td>
                    <td>{d.person_count}</td>
                    <td>{d.adult_count}</td>
                    <td>{d.minor_count}</td>
                    <td>{d.total_stay_in_days}</td>
                    <td>{d.total_due_for_room}</td>
                    <td>{d.other_expenses}</td>
                    <td>{d.additional_charges}</td>
                    <td>{d.discount}</td>
                    <td>{d.total_payable}</td>
                    <td>{d.total_paid}</td>
                    <td>{d.balance_amount}</td>
                    <td>{d.pay_mode}</td>
                    <td>{d.pay_date}</td>
                    <td>{d.pay_ref_id}</td>
                    <td>{d.pay_time}</td>
                    <td>{d.orderid}</td>
                    <td>{d.order_status}</td>
                    <td>{d.date}</td>
                    <td>{d.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
