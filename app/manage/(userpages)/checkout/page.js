"use client";
import { API_PATH, LS_USERID, LS_USERROLE, LS_USERTOKEN } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";

const Checkout = () => {
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online"); // Default to "Cash on Delivery"
  const [orderstatus, setorderstatus] = useState("pending");
  const [cartinfo, setcartinfo] = useState([]);
  const [userinfo, setuserinfo] = useState([]);
  const [orderid, setorderid] = useState("");
  const [receipt, setreceipt] = useState("");

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const router = useRouter();

  useEffect(() => {
    axios
      .post(API_PATH + "ManageHotel.php", {
        action: "getcheckoutdata",
        userid: localStorage.getItem(LS_USERID),
        usertoken: localStorage.getItem(LS_USERTOKEN),
      })
      .then((r) => {
        setcartinfo(r.data.cartinfo);
        setuserinfo(r.data.userinfo);
      });

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component is unmounted
    };
  }, []);

  // Order Creation is working in background
  const createOrderInBackEnd = () => {
    axios
      .post(API_PATH + "ManagePayments.php", {
        action: "createOrder",
        amount: cartinfo.payable_amount,
      })
      .then((r) => {
        if (r.data.status === "success") {
          setorderid(r.data.orderid);
          setreceipt(r.data.receipt);
        }
      });
  };

  // Adjusted handlePayment function to ensure createOrderInBackEnd() completes before proceeding

  const handlePayment = async () => {
    if (cartinfo.payable_amount > 0) {
      if (userinfo.usercontact != null || userinfo.useremail != null) {
        // Wait for the order to be created before proceeding with payment
        await createOrderInBackEnd();

        // Proceed only if orderid is available
        if (!orderid) {
          alert("Failed to create order. Please try again.");
          return;
        }

        const options = {
          key: "rzp_test_P7bzWe0qq1lzxn", // Test Api Key
          amount: Number(cartinfo.payable_amount) * 100, // Amount is in currency subunits. Default currency is INR.
          currency: "INR",
          name: "Mishra Ganesh Shankar Guest House",
          description: "Payment for Room Booking",
          image:
            "https://ganeshshankarguesthouse.com/_next/image?url=%2Fassets%2Fimg%2Fsslogo.png&w=828&q=75",
          order_id: orderid, // Use the orderid obtained from createOrderInBackEnd()
          handler: function (response) {
            // Proceed with completing the order after successful payment
            orderid
              ? axios
                  .post(API_PATH + "ManageHotel.php", {
                    action: "completeordergeneration",
                    userid: localStorage.getItem(LS_USERID),
                    usertoken: localStorage.getItem(LS_USERTOKEN),
                    transactionRef: response.razorpay_payment_id,
                    receiptno: receipt,
                    paidamount: cartinfo.payable_amount,
                    orderid: orderid,
                    paymentMethod: "online",
                  })
                  .then((r) => {
                    if (r.data.status === "success") {
                      alert(
                        "Your booking was successful, we're redirecting you to order history."
                      );
                      setTimeout(() => {
                        router.push("/manage/user-order-history");
                      }, 4000);
                    }
                  })
              : alert("faild");
          },
          prefill: {
            name: userinfo.fname + " " + userinfo.mname + " " + userinfo.lname,
            email: userinfo.useremail,
            contact: userinfo.usercontact,
          },
          notes: {
            address: "customeraddress",
          },
          theme: {
            color: "#ffcc00",
          },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert("Sorry, transaction failed. Please try again later.");
        });

        rzp1.open();
      } else {
        alert(
          "Email address or contact number seem to be incorrect please update before making payment."
        );
      }
    } else {
      alert(
        "Cart amount not defined, please check your cart again and proceed then."
      );
    }
  };

  // Improved generateorder function to ensure orderid is present before proceeding with account-transfer or COD
  const generateorder = async (e) => {
    e.preventDefault();
    if (paymentMethod === "account-transfer" && !transactionRef) {
      alert("Transaction reference number is required on account transfer!");
    } else if (paymentMethod === "online") {
      await handlePayment();
    } else {
      try {
        const r = await axios.post(API_PATH + "ManageHotel.php", {
          action: "completeordergeneration",
          userid: localStorage.getItem(LS_USERID),
          usertoken: localStorage.getItem(LS_USERTOKEN),
          paymentMethod,
          transactionRef,
          orderid: orderid, // Ensure orderid is sent here as well
        });

        if (r.data.status === "success") {
          setorderstatus("success");
          router.push("/manage/user-order-history");
        }
      } catch (error) {
        console.error("Error completing order:", error);
      }
    }
  };

  return (
    <div className="mh-90 pb-5">
      {orderstatus === "pending" ? (
        <div className="container alert alert-success mt-3">
          Select "Cash on Arrival" to pay in cash upon delivery. For "Account
          Transfers" enter the transaction reference number and complete your
          order. Online payments are processed through the provided gateway.
        </div>
      ) : (
        <div className="container alert alert-success mt-3">
          Booking placed successfully!
        </div>
      )}

      {orderstatus === "pending" ? (
        <div className="container bg-white rounded p-4 mt-4 shadow">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="mb-4">Checkout</h2>
            </div>
            <div className="text-end">
              <button
                className="btn btn-warning text-dark p-1  ps-2 pe-2"
                onClick={() => router.push("/manage/cart")}
              >
                Back to Cart
              </button>
            </div>
          </div>

          <div className="row">
            {/* First Column - Bank Account Details and UPI QR Code */}
            <div className="col-md-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <h4 className="card-title">Bank Account Details</h4>
                  <p className="card-text">Bank Name: State Bank of India</p>
                  <p className="card-text">Account Number: 10677164512</p>
                  <p className="card-text">IFSC Code: SBIN0008002</p>
                </div>
              </div>
              <div className="card border-0 shadow mb-4">
                <div className="card-body text-center">
                  <h4 className="card-title">UPI QR Code</h4>
                  <img
                    src="/assets/img/qr.jpg"
                    alt="UPI QR Code"
                    className="img-fluid rounded w-50"
                  />
                </div>
              </div>
            </div>

            {/* Second Column - Transaction Reference and Payment Options */}
            <div className="col-md-6">
              <div className="card border-0 shadow mb-4">
                <div className="card-body">
                  <form onSubmit={generateorder}>
                    <h4 className="card-title">Select Payment Method</h4>
                    <div className="mb-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="account-transfer"
                          value="account-transfer"
                          checked={paymentMethod === "account-transfer"}
                          onChange={() =>
                            handlePaymentMethodChange("account-transfer")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="account-transfer"
                        >
                          Account Transfer
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="cod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => handlePaymentMethodChange("cod")}
                        />
                        <label className="form-check-label" htmlFor="cod">
                          Pay on Arrival
                        </label>
                      </div>
                      {/* Uncomment below for online payment option */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="online"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => handlePaymentMethodChange("online")}
                        />
                        <label className="form-check-label" htmlFor="online">
                          Pay Online
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "account-transfer" && (
                      <div>
                        <h4 className="card-title">
                          Enter Transaction Reference
                        </h4>
                        <div className="mb-3">
                          <label
                            htmlFor="transactionRef"
                            className="form-label"
                          >
                            Transaction Reference Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="transactionRef"
                            placeholder="Enter transaction reference number"
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-warning text-dark "
                      onClick={generateorder}
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container bg-white rounded  shadow pt-5 pb-5">
          <div className="text-center">
            <FaCheckDouble className="text-success fs-1" />
          </div>
          <h4 className="text-center">Order placed!</h4>

          <p className="text-center">
            your order has been placed and is pending for confirmation from
            seller/supplier. Meanwhile you can select from options shared here
            under.{" "}
          </p>
          <div className="d-flex justify-content-center">
            <button
              className="btn base-gradient text-white p-1  ps-2 pe-2"
              onClick={() => router.push("/store")}
            >
              Go to Store
            </button>
            <button
              className="ms-2 btn base-gradient text-white p-1  ps-2 pe-2"
              onClick={() => router.push("/order-history")}
            >
              View Order History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
