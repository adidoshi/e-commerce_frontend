import React from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import Profile from "../../components/user/profile/Profile";

const Account = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Profile />
      <Footer />
    </>
  );
};

export default Account;
