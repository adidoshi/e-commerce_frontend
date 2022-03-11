import React, { useState } from "react";
import "./Navbar.css";
import mylogo2 from "../../../assets/images/mylogo2.png";
// import cart from "../../../assets/images/cart.png";
import menu from "../../../assets/images/menu.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const menuToggle = () => {
    setToggle(!toggle);
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <>
      <div className="nav_bg">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                <img src={mylogo2} width="125px" alt="..." />
              </Link>
            </div>
            <h1 className="brandHeading">Splash Store</h1>
            <nav>
              <ul style={{ maxHeight: toggle ? "200px" : "0px" }}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Prodcuts</Link>
                </li>
                <li onClick={scrollToBottom}>Contact</li>
                <li>
                  <Link to="/account">Account</Link>
                </li>
              </ul>
            </nav>
            <Link to="/cart">
              {/* {!userInfo && ( */}
              <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCart color="action" fontSize="large" />
              </Badge>
              {/* )} */}
            </Link>
            <img
              src={menu}
              className="menu-icon"
              onClick={menuToggle}
              alt="..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
