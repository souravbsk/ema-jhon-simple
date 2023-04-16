import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Carts from "../Carts/Carts";
import OrderItem from "../OrderItem/OrderItem";
import "./Order.css";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Order = () => {
  const saveCard = useLoaderData(); //get store cart product to  use hook useLoaderData() // plz check main.jsx

  const [cart, setCart] = useState(saveCard); //this link for after remove item store here.

  //remove specific item from cart with id
  const handleRemove = (id) => {
    const restProduct = cart.filter((product) => product.id !== id);
    setCart(restProduct);

    removeFromDb(id); //remove specific item from localStorage with id
  };

  //clear all product from cart and local storage
  const handleClearProduct = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <OrderItem
            handleRemove={handleRemove}
            key={product.id}
            product={product}
          ></OrderItem>
        ))}
      </div>
      <div>
        <Carts handleClearProduct={handleClearProduct} cart={cart}>
          <Link className="dynamic-link" to="/checkout">
            <button className="dynamic-btn">
              <span>Proceed Checkout</span>
              <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
            </button>
          </Link>
        </Carts>
      </div>
    </div>
  );
};

export default Order;
