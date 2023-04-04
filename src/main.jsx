import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shop from "./Components/Shop/Shop";
import Home from "./Components/Layout/Home";
import Order from "./Components/Order/Order";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/Login/Login";
import cartProductLoader from "./Components/loaders/cartProductsLoader";


const router = createBrowserRouter([
{
  path:"/",
  element:<Home></Home>,
  children:[
    {
      path:"/",
      element:<Shop></Shop>
    },
    {
      path:"order",
      element:<Order></Order>,
      loader:cartProductLoader
    },
    {
      path:"Inventory",
      element:<Inventory></Inventory>
    },
    {
      path:"login",
      element:<Login></Login>
    }
  ]
}
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
