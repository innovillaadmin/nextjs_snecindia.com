"use client";
import { API_PATH, LS_USERID, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const page = ({ params }) => {
  const router = useRouter();
  const [roomdata, setroomdata] = useState([]);
  const [userdata, setuserdata] = useState([]);

  const [roomid, setroomid] = useState("");
  const [roomname, setroomname] = useState("");
  const [customerid, setcustomerid] = useState("");
  const [customername, setcustomername] = useState("");
  const [bookingid, setbookingid] = useState("");
  const [checkindate, setcheckindate] = useState("");
  const [checkintime, setcheckintime] = useState("");
  const [checkoutdate, setcheckoutdate] = useState("");
  const [checkouttime, setcheckouttime] = useState("");
  const [bookingprice, setbookingprice] = useState("");
  const [maxprice, setmaxprice] = useState("");
  const [personcount, setpersoncount] = useState("");
  const [adultcount, setadultcount] = useState("");
  const [minorcount, setminorcount] = useState("");
  const [totalstaydays, settotalstaydays] = useState("");
  const [totaldue, settotaldue] = useState("");
  const [otherexpenses, setotherexpenses] = useState("");
  const [additionalcharges, setadditionalcharges] = useState("");
  const [extradiscount, setextradiscount] = useState("");
  const [totalpayable, settotalpayable] = useState("");
  const [totalpaid, settotalpaid] = useState("");
  const [balanceamount, setbalanceamount] = useState("");
  const [paymode, setpaymode] = useState("");

  const getroominfo = useCallback(async () => {
    await axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getroomsdatabyid",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        id: params.id,
      })
      .then((r) => {
        if (r.data.status === "success") {
          if (r.data.retval.order_status != "closed") {
            setroomdata(r.data.retval);
            setuserdata(r.data.retval2);
            setroomid(r.data.retval.roomid);
            setroomname(r.data.retval.room_name);
            setcustomerid(r.data.retval.userid);
            setcustomername(r.data.retval.user_name);
            setcheckindate(r.data.retval.check_in_date);
            setcheckintime(r.data.retval.check_in_time);
            setcheckoutdate(r.data.retval.check_out_date);
            setcheckouttime(r.data.retval.check_out_time);
            setbookingprice(r.data.retval.offer_price || 0);
            setmaxprice(r.data.retval.max_price || 0);
            setpersoncount(r.data.retval.person_count);
            setadultcount(r.data.retval.adult_count);
            setminorcount(r.data.retval.minor_count);
            settotalstaydays(r.data.retval.total_stay_in_days);
            settotaldue(r.data.retval.total_due_for_room || 0);
            setotherexpenses(r.data.retval.other_expenses || 0);
            setadditionalcharges(r.data.retval.additional_charges || 0);
            setextradiscount(r.data.retval.discount || 0);
            settotalpayable(r.data.retval.total_payable || 0);
            settotalpaid(r.data.retval.total_paid || 0);
            setbalanceamount(r.data.retval.balance_amount || 0);
            setpaymode(r.data.retval.pay_mode);
            setbookingid(r.data.retval.booking_id || 0);
          } else {
            setuserdata(r.data.retval2);
            setroomid(r.data.retval.roomid);
            setroomname(r.data.retval.room_name);
            setbookingprice(r.data.retval.offer_price || 0);
            setmaxprice(r.data.retval.max_price || 0);
          }
        } else {
          setroomdata([]);
          setuserdata([]);
        }
      });
  }, [params.id]);

  useEffect(() => {
    getroominfo();
  }, []);

  // calculations
  const calculateStayDays = useCallback(
    (checkindate, checkintime, checkoutdate, checkouttime) => {
      if (!checkindate || !checkintime || !checkoutdate || !checkouttime) {
        settotaldue(0);
        return;
      }

      const checkIn = combineDateAndTime(checkindate, checkintime);
      const checkOut = combineDateAndTime(checkoutdate, checkouttime);

      // Calculate the difference in time (milliseconds)
      const diffTime = checkOut.getTime() - checkIn.getTime();

      // Convert the time difference to days, then round up to the nearest full day
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      settotalstaydays(diffDays);

      settotaldue(Number(diffDays) * Number(bookingprice));
    },
    [bookingprice]
  );

  // Use useEffect to trigger calculation whenever the date or time changes
  useEffect(() => {
    calculateStayDays(checkindate, checkintime, checkoutdate, checkouttime);
  }, [checkindate, checkintime, checkoutdate, checkouttime]);

  // calculate total payable amount
  useEffect(() => {
    settotalpayable(
      Number(totaldue) +
        Number(otherexpenses) +
        Number(additionalcharges) -
        Number(extradiscount)
    );
  }, [totaldue, otherexpenses, additionalcharges, extradiscount]);

  // calculate balance amount
  useEffect(() => {
    setbalanceamount(Number(totalpayable) - Number(totalpaid));
  }, [totalpaid]);

  const combineDateAndTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };
  // calculations

  const handlebooking = useCallback(() => {
    if (paymode && totalpaid) {
      axios
        .post(API_PATH + "ManageHotel.php", {
          action: "managebooking",
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          bookingtype: roomdata.order_status === "generated" ? "close" : "open",
          roomid,
          roomname,
          bookingid,
          customerid,
          customername,
          checkindate,
          checkintime,
          checkoutdate,
          checkouttime,
          maxprice,
          bookingprice,
          personcount,
          adultcount,
          minorcount,
          totalstaydays,
          totaldue,
          otherexpenses,
          additionalcharges,
          extradiscount,
          totalpayable,
          totalpaid,
          balanceamount,
          paymode,
        })
        .then((r) => {
          if (r.data.status === "success") {
            alert("Booking closed redirecting to dashboard...");
            router.push("/manage/room-config");
          }
        });
    } else {
      alert("Payment amount or Mode is not selected, Kindly select one!");
    }
  }, [
    customerid,
    checkindate,
    checkintime,
    checkoutdate,
    checkouttime,
    bookingprice,
    personcount,
    adultcount,
    minorcount,
    totalstaydays,
    totaldue,
    otherexpenses,
    additionalcharges,
    extradiscount,
    totalpayable,
    totalpaid,
    balanceamount,
    paymode,
  ]);

  return (
    <div className="mh-90 pb-4">
      <div className="container pt-3">
        <div className="d-flex justify-content-center mb-3">
          <button
            type="submit"
            className="btn alert-success shadow text-capitalize"
          >
            {roomdata.order_status === "generated" ? "Booked" : "Available"}
          </button>
          <Link href={"/manage/add-user"}>
            <button type="submit" className="btn btn-warning shadow">
              Add Customer
            </button>
          </Link>
        </div>
        <div className="text-bold">
          {roomdata.order_status === "generated"
            ? "Close Booking/ Check Out"
            : "Book Room/ Check In"}
        </div>
        <div className="border-top border-warning border-3">
          <div className="row mt-3">
            {roomdata.order_status === "generated" ? (
              <div className="col-md-3 mt-1">
                <label htmlFor="select_customer">Customer Name</label>
                <input
                  className="form-control shadow"
                  name="select_customer"
                  defaultValue={roomdata.user_name}
                  disabled={true}
                />
              </div>
            ) : (
              <div className="col-md-3 mt-1">
                <label htmlFor="select_customer">
                  Select Existing Customer
                </label>
                <select
                  className="form-control shadow"
                  name="select_customer"
                  defaultValue={roomdata.user_name}
                  value={customerid}
                  onChange={(e) => setcustomerid(e.target.value)}
                >
                  <option value="">Select from list</option>
                  {userdata.map((d, i) => {
                    return (
                      <option value={d.id} key={i}>
                        {d.fname + " " + d.mname + " " + d.lname}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="col-md-3 mt-1">
              <label htmlFor="check_in_date">Check In Date</label>
              <input
                type="date"
                name="check_in_date"
                className="form-control shadow"
                value={checkindate}
                onChange={(e) => setcheckindate(e.target.value)}
                defaultValue={roomdata.check_in_date}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="check_in_time">Check in Time</label>
              <input
                type="time"
                name="check_in_time"
                className="form-control shadow"
                value={checkintime}
                onChange={(e) => setcheckintime(e.target.value)}
                defaultValue={roomdata.check_in_time}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="check_out_date_1">Check Out Date</label>
              <input
                type="date"
                name="check_out_date_1"
                className="form-control shadow"
                value={checkoutdate}
                onChange={(e) => setcheckoutdate(e.target.value)}
                defaultValue={roomdata.check_out_date}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="check_out_time_1">Check Out Time</label>
              <input
                type="time"
                name="check_out_time_1"
                className="form-control shadow"
                value={checkouttime}
                onChange={(e) => setcheckouttime(e.target.value)}
                defaultValue={roomdata.check_out_time}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="booking_price">Booking Price</label>
              <input
                type="number"
                min={0}
                name="booking_price"
                className="form-control shadow"
                value={bookingprice}
                onChange={(e) => setbookingprice(e.target.value)}
                defaultValue={roomdata.offer_price}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="person_count">Person Count</label>
              <input
                type="number"
                min={0}
                name="person_count"
                className="form-control shadow"
                value={personcount}
                onChange={(e) => setpersoncount(e.target.value)}
                defaultValue={roomdata.person_count}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="adult_count">Adult Count</label>
              <input
                type="number"
                min={0}
                name="adult_count"
                className="form-control shadow"
                value={adultcount}
                onChange={(e) => setadultcount(e.target.value)}
                defaultValue={roomdata.adult_count}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="minor_count">Minor Count</label>
              <input
                type="number"
                min={0}
                name="minor_count"
                className="form-control shadow"
                value={minorcount}
                onChange={(e) => setminorcount(e.target.value)}
                defaultValue={roomdata.minor_count}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="stay_days">Total Stay Days</label>
              <input
                type="number"
                min={0}
                name="stay_days"
                className="form-control shadow"
                value={totalstaydays}
                onChange={(e) => settotalstaydays(e.target.value)}
                defaultValue={roomdata.total_stay_in_days}
                disabled={true}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="total_due">Total Due</label>
              <input
                type="number"
                min={0}
                name="total_due"
                className="form-control shadow"
                value={totaldue}
                onChange={(e) => settotaldue(e.target.value)}
                defaultValue={roomdata.total_due_for_room}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="other_expenses">Other Expenses</label>
              <input
                type="number"
                min={0}
                name="other_expenses"
                className="form-control shadow"
                value={otherexpenses}
                onChange={(e) => setotherexpenses(e.target.value)}
                defaultValue={roomdata.other_expenses || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="additional_charges">Additional Charges</label>
              <input
                type="number"
                min={0}
                name="additional_charges"
                className="form-control shadow"
                value={additionalcharges}
                onChange={(e) => setadditionalcharges(e.target.value)}
                defaultValue={roomdata.additional_charges || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="extra_discount">Extra Discount</label>
              <input
                type="number"
                min={0}
                name="extra_discount"
                className="form-control shadow"
                value={extradiscount}
                onChange={(e) => setextradiscount(e.target.value)}
                defaultValue={roomdata.discount || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="total_payable">Total Payable</label>
              <input
                type="number"
                min={0}
                name="total_payable"
                className="form-control shadow"
                value={totalpayable}
                onChange={(e) => settotalpayable(e.target.value)}
                readOnly={true}
                defaultValue={roomdata.total_payable || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="total_paid">Total Paid</label>
              <input
                type="number"
                min={0}
                name="total_paid"
                className="form-control shadow"
                value={totalpaid}
                onChange={(e) => settotalpaid(e.target.value)}
                defaultValue={roomdata.total_paid || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="balance_amount">Balance Amount</label>
              <input
                type="number"
                min={0}
                name="balance_amount"
                className="form-control shadow"
                value={balanceamount}
                onChange={(e) => setbalanceamount(e.target.value)}
                readOnly={true}
                defaultValue={roomdata.balance_amount || 0}
              />
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="balance_amount">Payment Mode</label>
              <select
                name="balance_amount"
                className="form-control shadow"
                value={paymode}
                onChange={(e) => setpaymode(e.target.value)}
                defaultValue={roomdata.pay_mode}
              >
                {roomdata.pay_mode === "online" ? (
                  <option value="online">Online</option>
                ) : (
                  <>
                    <option value="">Select Mode</option>
                    <option value="online">Online</option>
                    <option value="cash">Cash</option>
                  </>
                )}
              </select>
            </div>
            <div className="col-md-3 mt-1">
              <label htmlFor="minor_count">Check in</label>
              <button
                type="number"
                min={0}
                name="minor_count"
                className="btn btn-warning form-control shadow"
                onClick={handlebooking}
              >
                {roomdata.order_status === "generated"
                  ? "Check Out"
                  : "Check In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
