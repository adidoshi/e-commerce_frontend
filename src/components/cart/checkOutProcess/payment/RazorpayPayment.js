// import React from 'react';

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeItemsFromCart } from "../../../../redux/actions/cartAction";
import { createOrder } from "../../../../redux/actions/orderAction";
import { errorOptions, successOptions } from "../../../utils/ToastStyles";

const history = useHistory();

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

// const RazorpayPayment = () => {
const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

const paymentData = {
  amount: Math.round(orderInfo.totalPrice * 100),
};

const { userInfo } = useSelector((state) => state.auth);
const { shippingInfo, cartItems } = useSelector((state) => state.cart);

const order = {
  shippingInfo,
  orderItems: cartItems,
  itemsPrice: orderInfo.subtotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharges,
  totalPrice: orderInfo.totalPrice,
};

export const dispalayRazorpay = async () => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK falied to load, are you online?");
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
    //   console.log(data);
    setPaymentLoading(false);

    const options = {
      key: "rzp_test_si4RqtqGDQeyhR",
      amount: data?.details?.amount,
      currency: data?.details?.currency,
      name: "Splash Store",
      description: "Ecommerce web application",
      image: "image",
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

          cartItems.map((item) => dispatch(removeItemsFromCart(item.product)));
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
//   return <>

//   </>;
// };

// export default RazorpayPayment;
