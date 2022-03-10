import React from "react";
import "./Header.css";
import landingPageImg from "../../../../assets/images/header0.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <h1>
                Give your workout <br /> A New Style!
              </h1>
              <p>
                Shop the most cool products available on the store <br /> let it
                be tshirts, electronics and much more!
              </p>
              <Link to="/products" className="btn">
                Explore now &#8594;
              </Link>
            </div>
            <div className="col-2">
              <img src={landingPageImg} alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
