import React from "react";
import "./Product.css";

const Product = (props) => {
    const handleAddToCart = props.handleAddToCart;
  const { name, price, img, seller, ratings } = props.product;
console.log(handleAddToCart);
  return (
    <div className="product">
      <img className="product-img" src={img} alt="" />
      <div className="product-content">
        <h6 className="product-name">{name}</h6>
        <p>Price: ${price}</p>
        <p>
          <small>Manufacturer: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings} star</small>
        </p>
      </div>
      <div>
        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(props.product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
