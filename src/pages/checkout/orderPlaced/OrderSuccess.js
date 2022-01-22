import React from "react";
import "./OrderSuccess.css";
import { CheckCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Navbar from "../../../components/layout/navbar/Navbar";
import Footer from "../../../components/layout/footer/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const OrderSuccess = () => {
  return (
    <>
      <Helmet title="Wohaa!! Order Placed | Splash Store" />
      <Toaster />
      <Navbar />
      <div className="orderSuccess">
        <CheckCircle />
        <h3>Your Order has been Placed successfully </h3>
        <Link to="/orders">View Orders</Link>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
