import React from "react";
import { Helmet } from "react-helmet";
import ResetPasswordForm from "../../components/auth/userForm/ResetPasswordForm";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const ResetPassword = () => {
  return (
    <>
      <Helmet title="Reset Password | Splash Store" />
      <Navbar />
      <ResetPasswordForm />
      <Footer />
    </>
  );
};

export default ResetPassword;
