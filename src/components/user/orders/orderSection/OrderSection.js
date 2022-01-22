import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./OrderSection.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Launch } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors, myOrders } from "../../../../redux/actions/orderAction";
import Loading from "../../../layout/loader/Loading";

const OrderSection = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { userInfo } = useSelector((state) => state.auth);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", minWidth: 150, flex: 0.3 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);
  return (
    <>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 id="myOrdersHeading">{userInfo.name}'s Orders</h3>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              // pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderSection;
