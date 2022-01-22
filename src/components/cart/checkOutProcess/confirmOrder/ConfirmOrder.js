import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../checkoutSteps/CheckOutSteps";
import { removeItemsFromCart } from "../../../../redux/actions/cartAction";
import { createOrder } from "../../../../redux/actions/orderAction";
import { errorOptions, successOptions } from "../../../utils/ToastStyles";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../../../redux/api";
import { Box, CircularProgress } from "@material-ui/core";

const ConfirmOrder = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country} `;

  // Razorpay Payment Gateway -

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const dispalayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK falied to load, are you online?", errorOptions);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setPaymentLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/payment/razorpay`,
        paymentData,
        config
      );
      console.log(data);
      setPaymentLoading(false);

      const options = {
        key: "rzp_test_si4RqtqGDQeyhR",
        amount: data?.details?.amount,
        currency: data?.details?.currency,
        name: "Splash Store",
        description: "Ecommerce web application",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZgxPXUn5--OkfZxqmijIzHisg0ikT3zM11A&usqp=CAU",
        order_id: data?.details?.id,
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          if (response.razorpay_payment_id) {
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
            };
            dispatch(createOrder(order));
            localStorage.removeItem("cartItems");

            cartItems.map((item) =>
              dispatch(removeItemsFromCart(item.product))
            );
            history.push("/order/success");
            toast.success("Order placed successfully!", successOptions);
          }
        },

        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: shippingInfo.phoneNo,
        },
        notes: {
          address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country} `,
        },
        theme: {
          color: "#EA5B29",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  // End of razorpay payment

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <>
      <Toaster />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h3>Shipping Info</h3>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{userInfo.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h3>Your Cart Items:</h3>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} =
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <h3>Order Summery</h3>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Pay with stripe</button>
            {paymentLoading && (
              <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
                <CircularProgress color="secondary" />
              </Box>
            )}
            <button onClick={dispalayRazorpay}>Pay with Razorpay</button>
            <a
              className="dummyCardLink"
              href="https://razorpay.com/docs/payments/payments/test-card-upi-details/"
              target="_blank"
              rel="noreferrer">
              Razorpay test card details
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
