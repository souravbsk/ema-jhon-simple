import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Carts from "../Carts/Carts";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { totalProduct } = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProduct / itemsPerPage);

  // const pageNumbers =[];
  // for(let i = 1; i<= totalPages; i++){
  //   pageNumbers.push(i)
  // }
  // console.log(pageNumbers);

  const pageNumbers = [...Array(totalPages).keys()];

  /***
   * done:1. Determine the number of items to display per page
   * TODO: 2. Determine the total number of items:
   */

  const [cart, setCart] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    const fatchData = async () => {
      const res = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fatchData();
  }, [currentPage, itemsPerPage]);

  //step quantity set
  useEffect(() => {
    // step1 get product from local storage
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch("http://localhost:5000/productByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
    .then(res => res.json())
    .then(data => {

      const savedCart = []; //define an empty array । for store update product with quantity
      for (const id in storedCart) {
        const addedProduct = data.find((product) => product._id === id); //get the product by using id
        if (addedProduct) {
          //check if addedProduct product available .
          const quantityValue = storedCart[id]; //get quantity of the local storage product
          addedProduct.quantity = quantityValue; //lets update addedProduct quantity value with quantityValue .
          savedCart.push(addedProduct); // push an update product in savedCart
        }
      }
      setCart(savedCart); // update cart value to send new update saved Cart
    })
    
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1

    const exists = cart.find((cartItem) => cartItem._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const restProduct = cart.filter(
        (cartItem) => cartItem._id !== product._id
      );
      newCart = [...restProduct, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  //clear all product from cart and local storage
  const handleClearProduct = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];

  const handleSelectChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="shop-container">
        <div>
          <div className="product-container">
            {
              // console.log(products)
              products.map((product) => (
                <Product
                  key={product._id}
                  handleAddToCart={handleAddToCart}
                  product={product}
                ></Product>
              ))
            }
          </div>
          {/* pagination area  */}
          <div className="paginationArea">
            <p>
              Current Page: {currentPage} and item per page {itemsPerPage}
            </p>
            {pageNumbers.map((number) => (
              <button
                className={currentPage === number ? "selected" : ""}
                onClick={() => setCurrentPage(number)}
                key={number}
              >
                {number}
              </button>
            ))}
            <select value={itemsPerPage} onChange={handleSelectChange}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Carts cart={cart} handleClearProduct={handleClearProduct}>
            <Link className="dynamic-link" to="/order">
              <button className="dynamic-btn">
                <span>Review Order</span>
                <FontAwesomeIcon icon={faRightLong}></FontAwesomeIcon>
              </button>
            </Link>
          </Carts>
        </div>
      </div>
    </>
  );
};

export default Shop;
