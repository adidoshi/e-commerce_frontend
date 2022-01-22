import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  getOrderDetails,
} from "../../../../redux/actions/orderAction";
import { Helmet } from "react-helmet";
import Loading from "../../../layout/loader/Loading";
import Footer from "../../../layout/footer/Footer";
import Navbar from "../../../layout/navbar/Navbar";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);
  return (
    <>
      <Helmet title="Order Details | Splash Store" />
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h4>Order #{order && order._id}</h4>
              <h3>Shipping Info</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h3>Payment</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }>
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h3>Order Status</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }>
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h3>Order Items:</h3>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default OrderDetails;
