import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<ProductList />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/login/:msg" exact element={<Login />} />
      <Route path="/register/:msg" element={<Register />} />

      <Route path="/wish_list" exact element={<WishList />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route
        path="/product_details/:product"
        exact
        element={<ProductDetails />}
      />
    </Routes>
  );
};

export default App;
