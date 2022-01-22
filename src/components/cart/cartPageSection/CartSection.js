import React from "react";
import { useHistory } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import "./CartSection.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../redux/actions/cartAction";
import CartItemCard from "../cartCard/CartItemCard";

const CartSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      history.push("/shipping");
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <div className="removeCartIcon">
            <RemoveShoppingCartIcon />
            <h2 className="emptyCartInfo">No product in cart</h2>
            <Link to="/products">View Products</Link>
          </div>
        </>
      ) : (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }>
                    -
                  </button>
                  <span>
                    <input
                      type="number"
                      className="inp-width"
                      value={item.quantity}
                      readOnly
                    />
                  </span>
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }>
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSection;
