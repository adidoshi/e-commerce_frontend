import React from "react";
import { Helmet } from "react-helmet";
import ShippingForm from "../../components/cart/checkOutProcess/shipping/ShippingForm";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const Shipping = () => {
  return (
    <>
      <Helmet title="Shipping details | Splash Store" />
      <Navbar />
      <ShippingForm />
      <Footer />
    </>
  );
};

export default Shipping;
