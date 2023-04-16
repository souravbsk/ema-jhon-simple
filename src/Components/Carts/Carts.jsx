import React, { useState } from "react";
import "./Carts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Carts = ({ cart,handleClearProduct,children }) => {
  let price = 0;
  let totalShipping = 0;
  let quantity = 0;

  for (const product of cart) {
    // update quantity 1 first time exist  shortcut _____________

    // if(product.quantity === 0){
    //   product.quantity = 1;
    // }

    // update quantity 1 first time exist  shortcut _____________
    // product.quantity = product.quantity || 1;

    price += product.price * product.quantity;
    totalShipping += product.shipping * product.quantity;
    quantity = quantity + product.quantity;
  }
  const tax = (price * 7) / 100;
  const grandTotalPrice = price + totalShipping + tax;

  return (
    <div className="cart">
      <h5 className="cart-title">Order Summary</h5>
      <div className="cart-content">
        <p>Selected Items:{quantity}</p>
        <p>Total Price: ${price}</p>
        <p>Total Shipping Charge: ${totalShipping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h6 className="grand-total">
          Grand Total: {grandTotalPrice.toFixed(2)}
        </h6>
      </div>
      <div className="addToCartAllBtn">
        <button onClick={handleClearProduct} className="clear-btn">
          <span>Clear Cart</span>
        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Carts;
