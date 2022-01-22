import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../../assets/images/profileImg.png";
import "./Profile.css";
import Loading from "../../layout/loader/Loading";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadUser } from "../../../redux/actions/userAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Toaster />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={user?.avatar?.url ? user?.avatar?.url : profileImg}
                alt={user?.name}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
