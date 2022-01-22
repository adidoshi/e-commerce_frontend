import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../../redux/actions/adminAction";
import { DELETE_PRODUCT_RESET } from "../../../redux/constants/adminActionsTypes";
import toast, { Toaster } from "react-hot-toast";
import {
  errorOptions,
  successOptions,
} from "../../../components/utils/ToastStyles";
import { Helmet } from "react-helmet";
import Sidebar from "../sidebar/Sidebar";
import Loading from "../../../components/layout/loader/Loading";

const ProductList = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminProduct
  );
  const { loading, products: adProducts } = useSelector(
    (state) => state.adProducts
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAdminProducts());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product deleted successfully", successOptions);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    { filed: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      flex: 0.5,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 270,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <Edit />
              </Link>
            </Button>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  adProducts &&
    adProducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <Helmet title="All Products | Admin" />
      <Toaster />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading"> All products</h1>
          {loading ? (
            <Loading />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoheight
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
