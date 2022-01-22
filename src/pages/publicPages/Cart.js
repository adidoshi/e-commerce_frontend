import React from "react";
import { Helmet } from "react-helmet";
import CartSection from "../../components/cart/cartPageSection/CartSection";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const Cart = () => {
  return (
    <>
      <Helmet title="Cart | Splash Store!" />
      <Navbar />
      <CartSection />
      <Footer />
    </>
  );
};

export default Cart;
