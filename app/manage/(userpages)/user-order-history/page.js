"use client";
import React from "react";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

const OrderHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format the date into "DD-MM-YYYY" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch bookings from API
  useEffect(() => {
    try {
      axios
        .post(API_PATH + "ManageHotel.php", {
          action: "getuserorderhistory",
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
        })
        .then((r) => {
          if (r.data.status === "success") {
            setBookings(r.data.retval);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error("Error fetching bookings", error);
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="mh-90 pt-5">
        <h3 className="mt-5 text-center">Loading........</h3>
      </div>
    );
  }

  return (
    <div className="container mh-90">
      <h2 className="pt-5">Order History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bg-white rounded overflow-x-scroll border">
          <table className="table table-striped text-capitalize">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Room Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Stay (Days)</th>
                <th>Total Paid</th>
                <th>Balance Amount</th>
                <th>Payment Mode</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.orderid}</td>
                  <td>{booking.room_name}</td>
                  <td>{`${formatDate(booking.check_in_date)} ${booking.check_in_time
                    }`}</td>
                  <td>{`${formatDate(booking.check_out_date)} ${booking.check_out_time
                    }`}</td>
                  <td>{booking.total_stay_in_days}</td>
                  <td>{booking.total_paid}</td>
                  <td>{booking.balance_amount}</td>
                  <td>{booking.pay_mode}</td>
                  <td>{booking.order_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
