import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import Navbar from "../../components/layout/navbar/Navbar";
import Footer from "../../components/layout/footer/Footer";
import PaymentSection from "../../components/cart/checkOutProcess/payment/PaymentSection";

const Payment = () => {
  return (
    <>
      <Helmet title="Payment | Splash Store" />
      <Elements
        stripe={loadStripe(
          "pk_test_51K1551SDnoY2CtrW6XcOI34M6n7Um7TRAoH2C3vWBjGz3AKujhK00bjmsqcqQCOhgcR6j2RqvuGA1TgArxMokl2e00Mu9OyJaW"
        )}>
        <Navbar />
        <PaymentSection />
        <Footer />
      </Elements>
    </>
  );
};

export default Payment;
