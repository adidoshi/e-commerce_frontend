import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentSection.css";
import { CreditCard, Event, FileCopy, VpnKey } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  createOrder,
} from "../../../../redux/actions/orderAction";
import { BASE_URL } from "../../../../redux/api";
import { successOptions } from "../../../utils/ToastStyles";
import CheckoutSteps from "../checkoutSteps/CheckOutSteps";
import { removeItemsFromCart } from "../../../../redux/actions/cartAction";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress, Button } from "@material-ui/core";

const PaymentSection = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const history = useHistory();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  const cardDetails = {
    cardNumber: "4000 0027 6000 3184",
    cardExpiry: "12/25",
    cardCVV: 121,
  };
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handleCopyText = useCallback((cardInfo) => {
    copy(cardInfo);
    toast.success("Copied", successOptions);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setPaymentLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/payment/process`,
        paymentData,
        config
      );
      setPaymentLoading(false);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userInfo.name,
            email: userInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          localStorage.removeItem("cartItems");

          cartItems.map((item) => dispatch(removeItemsFromCart(item.product)));
          history.push("/order/success");
          toast.success("Order placed successfully!", successOptions);
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <Toaster />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          {paymentLoading && (
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          <h3>Card Info</h3>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay with Stripe - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
        <div style={{ margin: "30px 0", textAlign: "center" }}>
          <h4 style={{ textAlign: "center", marginBottom: "8px" }}>
            Copy stripe test integration card details
          </h4>
          <Button
            style={{ cursor: "pointer" }}
            variant="outlined"
            onClick={() => handleCopyText(cardDetails.cardNumber)}
            startIcon={<FileCopy />}>
            4000 0027 6000 3184
          </Button>
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ cursor: "pointer" }}
              variant="outlined"
              onClick={() => handleCopyText(cardDetails.cardExpiry)}
              startIcon={<FileCopy />}>
              12/25
            </Button>
            <Button
              style={{ marginLeft: "10px", cursor: "pointer" }}
              variant="outlined"
              onClick={() => handleCopyText(cardDetails.cardCVV)}
              startIcon={<FileCopy />}>
              121
            </Button>
          </div>
        </div>
        <p>
          <strong>
            Do not refresh the page or click back button when you click
            'Authentication' on stripe payment page!
          </strong>
        </p>
      </div>
    </>
  );
};

export default PaymentSection;
