import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import UpdateProfileSection from "../../components/user/profile/UpdateProfileSection";

const UpdateProfile = () => {
  return (
    <>
      <Helmet title="Update Profile | Splash Store" />
      <Navbar />
      <UpdateProfileSection />
      <Footer />
    </>
  );
};

export default UpdateProfile;
