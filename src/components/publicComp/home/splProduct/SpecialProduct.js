import React from "react";
import exclusive from "../../../../assets/images/exclusive.png";
import "./SpecialProduct.css";

const SpecialProduct = () => {
  return (
    <>
      <div className="spl-product">
        <div className="offer">
          <div className="small-container">
            <div className="row">
              <div className="col-2">
                <img src={exclusive} className="offer-img" alt="..." />
              </div>
              <div className="col-2">
                <p>Exclusively Available on Splash store</p>
                <h1>Smart Band 4</h1>
                <small>
                  The Mi Smart Band 4 features a 39.39% larger (than Mi band 3)
                  AMOLED color full-touch display with adjustable brightness, so
                  everything is clear as can be.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
