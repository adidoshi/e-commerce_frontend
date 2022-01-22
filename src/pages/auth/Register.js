import React from "react";
import { Helmet } from "react-helmet";
import UserSignUpForm from "../../components/auth/userForm/UserSignUpForm";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const Register = () => {
  return (
    <>
      <Helmet title="Register | Splash Store" />
      <Navbar />
      <UserSignUpForm />
      <Footer />
    </>
  );
};

export default Register;
