"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_PATH, LS_USERID, LS_USERROLE, LS_USERTOKEN } from "@/app/config";
import Link from "next/link";

const Cart = () => {
  const router = useRouter();

  // Sample cart items related to room bookings
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [counter, setcounter] = useState(0);

  // Remove item from cart
  const removeItem = (id) => {
    if (id) {
      axios
        .post(API_PATH + "ManageHotel.php", {
          action: "deleteitemfromcart",
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          delid: id,
        })
        .then((r) => {
          if (r.data.status === "success") {
            setcounter(Number(counter) + 1);
          }
        });
    }
  };
  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getcartitemsforuser",
        usertoken: localStorage.getItem(LS_USERID),
        userrole: localStorage.getItem(LS_USERROLE),
        userid: localStorage.getItem(LS_USERID),
      })
      .then((r) => {
        if (r.data.status === "success") {
          setCartItems(r.data.retval);
          setTotal(r.data.total);
        }
      });
  }, [counter, removeItem]);

  // Handle checkout (Redirect to checkout page)
  const handleCheckout = () => {
    router.push("/manage/checkout"); // Redirect to the checkout page
  };

  return (
    <div className="container mh-90 pt-5 pb-5">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link href={"/rooms"}>
            <button type="submit" className="btn btn-warning">
              Go to Booking Page
            </button>
          </Link>
        </>
      ) : (
        <>
          <div style={{ overflowX: "scroll" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Room Name</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
                  <th>Adult Count</th>
                  <th>Minor Count</th>
                  <th>Total Stay (Days)</th>
                  <th>Price Per Night</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.room_name}</td>
                    <td>{item.check_in_date}</td>
                    <td>{item.check_out_date}</td>
                    <td>{item.adult_count}</td>
                    <td>{item.minor_count}</td>
                    <td>{item.total_stay_in_days || 0}</td>
                    <td>INR {item.booking_price || 0}</td>
                    <td>INR {item.total_due_for_room || 0}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary pt-2">
            <h4>Total: INR {total || 0}</h4>
          </div>

          <button className="btn btn-warning" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
