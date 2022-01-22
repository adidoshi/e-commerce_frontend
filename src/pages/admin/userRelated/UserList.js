import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../../redux/actions/adminAction";
import {
  errorOptions,
  successOptions,
} from "../../../components/utils/ToastStyles";
import { DELETE_USER_RESET } from "../../../redux/constants/adminActionsTypes";
import Sidebar from "../sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loading from "../../../components/layout/loader/Loading";

const UsersList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.adUserAc);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  useEffect(() => {
    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError, errorOptions);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message, successOptions);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <Helmet title="All Users | Admin" />
      <Toaster />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {loading ? (
            <Loading />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
