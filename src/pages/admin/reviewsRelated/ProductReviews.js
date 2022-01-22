import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { Delete, Star } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { getAllReviews } from "../../../redux/actions/productsAction";
import toast from "react-hot-toast";
import { clearErrors, deleteReview } from "../../../redux/actions/adminAction";
import { Helmet } from "react-helmet";
import Sidebar from "../sidebar/Sidebar";
import { DELETE_REVIEW_RESET } from "../../../redux/constants/adminActionsTypes";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    error: deleteError,
    isDeleted,
    loading: delRevLoading,
  } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
    dispatch(getAllReviews(productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item?._id,
        rating: item?.rating,
        comment: item?.comment,
        user: item?.name,
      });
    });

  return (
    <>
      <Helmet title="All reviews | Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}>
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <p style={{ marginBottom: "5px" }}>
              Sample product Id to search: <em>619b56b953b855e9e3d90ff4</em>
            </p>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }>
              Search
            </Button>
          </form>

          {delRevLoading && (
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
