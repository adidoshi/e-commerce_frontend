import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import UpdatePasswordSection from "../../components/user/profile/UpdatePasswordSection";

const UpdatePassword = () => {
  return (
    <>
      <Helmet title="Update Password | Splash Store" />
      <Navbar />
      <UpdatePasswordSection />
      <Footer />
    </>
  );
};

export default UpdatePassword;
