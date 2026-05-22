import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./User/Register";
import Contact from "./pages/Contact";
import ProductPage from "./pages/ProductPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./User/Login";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ViewProducts from "./pages/Admin/ViewProducts";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import { setCart, getUserStorageKey } from "./features/cart/cartSlice";
import Profile from "./User/Profile";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Checkout from "./pages/Checkout";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  // Ensure cart is migrated/scoped to current user and update redux store
  useEffect(() => {
    try {
      const key = getUserStorageKey();
      const legacyKey = "cartItems";
      const guestKey = "cartItems_guest";
      let raw = null;
      if (isAuthenticated) {
        // For logged in users: migrate legacy/guest data into user key once
        raw = localStorage.getItem(key);
        if (!raw) {
          raw =
            localStorage.getItem(legacyKey) ||
            sessionStorage.getItem(guestKey) ||
            null;
          if (raw) {
            localStorage.setItem(key, raw);
            try {
              localStorage.removeItem(legacyKey);
              sessionStorage.removeItem(guestKey);
            } catch (e) {}
          }
        }
      } else {
        // Guest: read from sessionStorage guest key only (no migration)
        raw = sessionStorage.getItem(guestKey) || null;
      }
      const items = raw ? JSON.parse(raw) : [];
      dispatch(setCart(items));
    } catch (e) {
      // ignore
    }
  }, [dispatch, isAuthenticated, user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/viewProducts" element={<ViewProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
