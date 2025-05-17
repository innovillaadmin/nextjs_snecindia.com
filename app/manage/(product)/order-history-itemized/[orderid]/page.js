"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_PATH, LS_USERID, LS_USERROLE, LS_USERTOKEN } from "@/app/config";
import Image from "next/image";

const Cart = ({ params }) => {
  const [cartItems, setCartItems] = useState([]);

  const [cartTotal, setCartTotal] = useState(0); // State for cart total
  const [counter, setcounter] = useState(0); // State for cart total

  const router = useRouter();

  useEffect(() => {
    scrollTo(0, 0);
    if (localStorage.getItem(LS_USERROLE !== "customer")) {
      router.push("/logout");
    } else {
      fetchCartItems();
    }
  }, [router, counter]);

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const fetchCartItems = async () => {
    // setCartItems([]);
    try {
      const r = await axios.post(API_PATH + "ManageProducts.php", {
        action: "getitemizedorderhistory",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
        orderid: params.orderid,
      });
      if (r.data.status === "success") {
        setCartItems(r.data.retval);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.sale_price * item.qty,
      0
    );
    setCartTotal(total);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    router.push("/checkout");
  };

  return (
    <div className="container mt-5 mh-90">
      <div className="text-end">
        <button
          className="btn base-gradient text-white p-1"
          onClick={() => router.push("/order-history")}
        >
          To Order history
        </button>
      </div>
      <h2>Detailed view</h2>
      {cartItems.length === 0 ? (
        <p>Order list is empty</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Sale Value</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((d, i) => (
                  <tr key={d.id}>
                    <td>
                      <Image
                        src={API_PATH + "assets/img/product/" + d.image}
                        alt="prodcard"
                        loading="lazy"
                        className="border rounded"
                        width={100}
                        height={100}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    </td>
                    <td
                      style={{ fontSize: 12, fontWeight: "bold" }}
                      className="ellipsis"
                    >
                      {d.prod_name} <br />
                      {d.brand} <br />
                      {d.application} <br />
                      {d.vehicle_model} <br />
                      {d.parto_no} <br />
                    </td>
                    <td style={{ fontSize: 12, fontWeight: "bold" }}>
                      Rs. {d.sale_price}
                    </td>
                    <td>{d.qty}</td>
                    <td style={{ fontSize: 12, fontWeight: "bold" }}>
                      Rs. {d.sale_value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <p className="h5">
              <span className="bg-white shadow rounded p-2">
                Cart Total: Rs. {cartTotal}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
