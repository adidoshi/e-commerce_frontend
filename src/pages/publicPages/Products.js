import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import ProductSection from "../../components/products/ProductSection";

const Products = () => {
  return (
    <>
      <Helmet title="Splash Store | Products" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Navbar />
        <div style={{ flexGrow: "1", minHeight: "100vh" }}>
          <ProductSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;
