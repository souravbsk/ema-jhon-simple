import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Carts from "../Carts/Carts";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //step quantity set
  useEffect(() => {
    // step1 get product from local storage
    const storedCart = getShoppingCart();
    const savedCart = []; //define an empty array । for store update product with quantity

    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id); //get the product by using id
      if (addedProduct) {
        //check if addedProduct product available .
        const quantityValue = storedCart[id]; //get quantity of the local storage product
        addedProduct.quantity = quantityValue; //lets update addedProduct quantity value with quantityValue .
        savedCart.push(addedProduct); // push an update product in savedCart
      }
    }
    setCart(savedCart); // update cart value to send new update saved Cart
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1

    const exists = cart.find(cartItem => cartItem.id === product.id);
    if(!exists){
      product.quantity = 1;
      newCart = [...cart,product];
    }
    else{
      exists.quantity = exists.quantity + 1;
      const restProduct= cart.filter(cartItem => cartItem.id !== product.id)
      newCart = [...restProduct,exists]
    }

    setCart(newCart);
    addToDb(product.id);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {
          // console.log(products)
          products.map((product) => (
            <Product
              key={product.id}
              handleAddToCart={handleAddToCart}
              product={product}
            ></Product>
          ))
        }
      </div>
      <div>
        <Carts cart={cart}></Carts>
      </div>
    </div>
  );
};

export default Shop;
