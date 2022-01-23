import React, { useEffect, Fragment, useState } from "react";
// import ReactStars from "react-rating-stars-component";
import "./ProductInfo.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { successOptions } from "../../utils/ToastStyles";
import Loading from "../../layout/loader/Loading";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../../redux/actions/productsAction";
import { addItemsToCart } from "../../../redux/actions/cartAction";
// import product6 from "../../../assets/images/product-6.jpg";
import ReviewCard from "./reviews/ReviewCard";
import { NEW_REVIEW_RESET } from "../../../redux/constants/productsActionsTypes";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    toast.success("Item added to cart", successOptions);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (reviewError) {
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review submitted successfully!", successOptions);
      setComment("");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toaster />
          <div className="ProductDetails">
            <div>
              <Carousel autoPlay={false}>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>( {product.numOfReviews} Reviews )</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>
                      <input
                        className="inp-width"
                        readOnly
                        value={quantity}
                        type="number"
                      />
                    </span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}>
                    Add to cart
                  </button>
                </div>

                <p>
                  Status: &nbsp;
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              {userInfo && (
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              )}
            </div>
          </div>

          <h3 className="reviewsHeading"> REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <span>
                <Rating
                  name="unique-rating"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
              </span>
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review, i) => (
                <ReviewCard review={review} key={i} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}
        </>
      )}
    </Fragment>
  );
};

export default ProductInfo;
