import React from "react";
import { Helmet } from "react-helmet";
import ConfirmOrder from "../../components/cart/checkOutProcess/confirmOrder/ConfirmOrder";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const ConfirmOrderPage = () => {
  return (
    <>
      <Helmet title="Confirm Order | Splash Store" />
      <Navbar />
      <ConfirmOrder />
      <Footer />
    </>
  );
};

export default ConfirmOrderPage;
