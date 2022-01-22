import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { MailOutline, Person, VerifiedUser } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../../redux/actions/adminAction";
import { UPDATE_USER_RESET } from "../../../redux/constants/adminActionsTypes";
import Sidebar from "../sidebar/Sidebar";
import { Helmet } from "react-helmet";
import Loading from "../../../components/layout/loader/Loading";
import toast, { Toaster } from "react-hot-toast";
import { successOptions } from "../../../components/utils/ToastStyles";

const UpdateUser = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.adUserAc);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully", successOptions);
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <Helmet title="Update User | Admin" />
      <Toaster />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}>
              {updateLoading && (
                <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
                  <CircularProgress color="secondary" />
                </Box>
              )}
              <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }>
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
