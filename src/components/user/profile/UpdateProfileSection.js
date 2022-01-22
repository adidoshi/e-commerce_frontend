import React, { useState, useEffect } from "react";
import "../../auth/userForm/UserForm.css";
import { useHistory } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { errorOptions, successOptions } from "../../utils/ToastStyles";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../redux/constants/userActionsTypes";
import { Box, CircularProgress } from "@material-ui/core";
import profileImg from "../../../assets/images/profileImg.png";

const UpdateProfileSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAvatarPreview(
        userInfo?.avatar?.url ? userInfo?.avatar?.url : profileImg
      );
    }

    if (error) {
      toast.error(error, errorOptions);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully", successOptions);
      dispatch(loadUser());
      history.push("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, history, userInfo, isUpdated]);

  return (
    <>
      <Toaster />
      <div className="main">
        <div className="wrapper">
          {loading && (
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          <div className="title-text">Update Profile</div>
          <div className="form-inner">
            <form
              action="#"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}>
              <div className="pass-box">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inp"
                />
                <button className="pass-show">
                  <FaceIcon />
                </button>
              </div>
              <div className="pass-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inp"
                />
                <button className="pass-show">
                  <MailOutlineIcon />
                </button>
              </div>
              <div className="pass-box updateProfileImg">
                {avatarPreview && (
                  <img src={avatarPreview} alt="Avatar Preview" />
                )}
                <input
                  className="img-inp"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
              <button
                className={`btnFilled ${loading ? "btn-disabled" : ""}`}
                disabled={loading ? true : false}
                type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileSection;
