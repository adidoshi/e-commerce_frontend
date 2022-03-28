import React from "react";
import "./ProductCard.css";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <Link className="col-4" to={`/product/${product._id}`}>
        <img src={product?.images[0]?.url} alt="..." />

        <h4>{product?.name}</h4>

        <div className="rating">
          <Rating {...options} />
        </div>
        <p> {product?.numOfReviews} Reviews</p>
        <p style={{ color: "tomato", fontSize: "15px" }}>
          <strong>₹ {product.price}</strong>
        </p>
      </Link>
    </>
  );
};

export default ProductCard;
