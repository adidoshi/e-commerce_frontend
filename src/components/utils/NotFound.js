import { NotInterested } from "@material-ui/icons";
import React from "react";
import Navbar from "../layout/navbar/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <h3 style={{ textAlign: "center", marginTop: "5rem" }}>
        Didn't matched any route.
      </h3>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <NotInterested />
      </div>
    </>
  );
};

export default NotFound;
