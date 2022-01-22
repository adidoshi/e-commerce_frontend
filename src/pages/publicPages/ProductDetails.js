import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/layout/footer/Footer";
import Navbar from "../../components/layout/navbar/Navbar";
import ProductInfo from "../../components/products/productDetails/ProductInfo";

const ProductDetails = () => {
  return (
    <div>
      <Helmet title="Product Details | Splash Store" />
      <Navbar />
      <ProductInfo />
      <Footer />
    </div>
  );
};

export default ProductDetails;
