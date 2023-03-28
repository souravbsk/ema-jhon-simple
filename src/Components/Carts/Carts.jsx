import React, { useState } from "react";
import "./Carts.css";

const Carts = ({ cart }) => {
  console.log(cart);
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
    console.log(product);

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
    </div>
  );
};

export default Carts;
