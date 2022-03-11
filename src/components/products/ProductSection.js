import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./ProductSection.css";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  fetchProducts,
  getProducts,
} from "../../redux/actions/productsAction";
import ProductCard from "./ProductCard";
import { Search } from "@material-ui/icons";
import Loading from "../layout/loader/Loading";

const categories = [
  "Electronics",
  "Bottom",
  "Tops",
  "Camera",
  "Attire",
  "Smartphones",
];

const ProductSection = () => {
  const [keywordcheck, setKeywordCheck] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordcheck.trim()) {
      history.push(`/products/${keywordcheck}`);
    } else {
      history.push("/products");
    }
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;
  const keyword = params.keyword;
  useEffect(() => {
    dispatch(fetchProducts());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, error, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toaster />
          <div className="small-container">
            <h2 className="productPageTitle">All Products</h2>
            <form className="searchForm">
              <input
                type="text"
                className="searchInp"
                placeholder="Search products"
                onChange={(e) => setKeywordCheck(e.target.value)}
              />
              <Search
                onClick={searchSubmitHandler}
                aria-hidden="true"
                style={{ cursor: "pointer" }}
              />
            </form>
            <div className="row heightChange">
              {products &&
                products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
            </div>
            <Link to="/allproducts">
              <button
                className="btn"
                style={{ border: "none", cursor: "pointer" }}>
                All Products &#8594;
              </button>
            </Link>
          </div>

          <div className="filterBox">
            <h3>Filters -</h3>
            <h4 className="filterBox-titleOne">Price</h4>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <h4 className="filterBox-title">Categories</h4>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}>
                    {category}
                  </li>
                );
              })}
            </ul>

            <h4 className="filterBox-title">Ratings</h4>
            <fieldset>
              <Typography component="legend">* Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default ProductSection;
