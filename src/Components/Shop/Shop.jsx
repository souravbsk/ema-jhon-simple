import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    const [cart,setCart] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    const updateCart = [...cart,product];
    setCart(updateCart)
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {
          // console.log(products)
          products.map((product) => (
            <Product key={product.id} handleAddToCart={handleAddToCart} product={product}></Product>
          ))
        }
      </div>
      <div className="cart-container">
        <h4>product cart</h4>
        <p>Total Product: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
