import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layout/footer/Footer";
import Loading from "../../components/layout/loader/Loading";
import Navbar from "../../components/layout/navbar/Navbar";
import ProductCard from "../../components/products/ProductCard";
import Header from "../../components/publicComp/home/header/Header";
import SpecialProduct from "../../components/publicComp/home/splProduct/SpecialProduct";
import Testimonial from "../../components/publicComp/home/testimonials/Testimonial";
import { errorOptions } from "../../components/utils/ToastStyles";
import { clearErrors, getProducts } from "../../redux/actions/productsAction";

const Home = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { products: allProds, loading } = useSelector((state) => state.prods);

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);
  return (
    <>
      <Toaster />
      <Helmet title="Splash Store | Home" />
      <Navbar />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="small-container">
          <h2 className="title">Featured Products</h2>
          <div className="row">
            {allProds &&
              allProds.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
          </div>
        </div>
      )}
      <SpecialProduct />
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;
