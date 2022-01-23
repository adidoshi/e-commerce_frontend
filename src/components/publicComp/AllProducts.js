import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productsAction";
import Footer from "../layout/footer/Footer";
import Loading from "../layout/loader/Loading";
import Navbar from "../layout/navbar/Navbar";
import ProductCard from "../products/ProductCard";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products: allProds, loading } = useSelector((state) => state.prods);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Helmet title="All Products | Splash Store" />
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="small-container">
          <h2 className="title">All Products</h2>
          <div className="row">
            {allProds &&
              allProds.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllProducts;
