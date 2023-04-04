import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Carts from "../Carts/Carts";
import OrderItem from "../OrderItem/OrderItem";
import "./Order.css";
import { removeFromDb } from "../../utilities/fakedb";

const Order = () => {
  const saveCard = useLoaderData();
  const [cart, setCart] = useState(saveCard);

  const handleRemove = (id) => {
    const restProduct = cart.filter((product) => product.id !== id);
    setCart(restProduct);
    removeFromDb(id)
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
        <Carts cart={cart}></Carts>
      </div>
    </div>
  );
};

export default Order;
