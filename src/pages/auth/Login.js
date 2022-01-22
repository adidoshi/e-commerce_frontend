import React from "react";
import { Helmet } from "react-helmet";
import UserLoginForm from "../../components/auth/userForm/UserLoginForm";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";

const Login = () => {
  return (
    <>
      <Helmet title="Login | Splash Store" />
      <Navbar />
      <UserLoginForm />
      <Footer />
    </>
  );
};

export default Login;
