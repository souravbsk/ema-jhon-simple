import React from "react";
import "./OrderItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const OrderItem = ({ product,handleRemove }) => {
  const { _id, img, name, price, shipping,quantity } = product;
  return (
    <div className="order-item">
      <img className="order-item-img" src={img} alt="" />
      <div className="review-details">
        <h6 className="review-title">{name}</h6>
        <p>Price: {price}</p>
        <p>Order Quantity: {quantity}</p>
      </div>
      <button onClick={() => handleRemove(_id)} className="remove-review-btn">
        <FontAwesomeIcon className="remove-icon" icon={faTrashAlt}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default OrderItem;
