import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import OrderSection from "../../components/user/orders/orderSection/OrderSection";

const Orders = () => {
  return (
    <>
      <Helmet title="Your Orders | Splash Store" />
      <Navbar />
      <OrderSection />
      <Footer />
    </>
  );
};

export default Orders;
