import React from "react";
import { Helmet } from "react-helmet";
import ForgotPasswordForm from "../../components/auth/userForm/ForgotPasswordForm";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const ForgotPassword = () => {
  return (
    <>
      <Helmet title="Forgot Password | Splash Store" />
      <Navbar />
      <ForgotPasswordForm />
      <Footer />
    </>
  );
};

export default ForgotPassword;
