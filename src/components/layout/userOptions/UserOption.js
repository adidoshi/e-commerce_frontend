import React, { useEffect, useState } from "react";
import "./UserOption.css";
import Backdrop from "@material-ui/core/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { successOptions } from "../../utils/ToastStyles";
import profileImg from "../../../assets/images/profileImg.png";
import { loadUser } from "../../../redux/actions/userAction";

const UserOption = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (userInfo?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/account");
  }

  function cart() {
    history.push("/cart");
  }

  function logoutUser() {
    localStorage.removeItem("userInfo");
    toast.success("Logout successfully", successOptions);
    history.go("/");
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial toolpit example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url ? user?.avatar?.url : profileImg}
            alt="profile"
          />
        }>
        {options.map((item, i) => {
          return (
            <SpeedDialAction
              key={i}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </>
  );
};

export default UserOption;
