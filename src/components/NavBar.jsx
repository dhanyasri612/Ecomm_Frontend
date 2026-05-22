import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, ShoppingCart, User, X, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../features/cart/cartSlice";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const [searchQuery, setSearchQuey] = useState("");
  const cartCount = cartItems.length || 0;
  const [miniOpen, setMiniOpen] = useState(false);
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
    setSearchQuey("");
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between ">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <ShoppingBag />
          <span>Shop-Mart</span>
        </Link>
        {/*Desktop Link*/}
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/about-us"
          >
            About
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/contact-us"
          >
            Contact
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/products"
          >
            Products
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link
              className="text-gray-700 hover:text-blue-600 transition font-semibold"
              to="/admin/add-product"
            >
              Add Product
            </Link>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <Link
              className="text-gray-700 hover:text-blue-600 transition font-semibold"
              to="/admin/viewProducts"
            >
              Manage Products
            </Link>
          )}
        </div>
        {/*Right section*/}
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center border border-slate-300 rounded  overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search Product"
              className="px-3 py-2 text-sm w-40 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuey(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 text-gray-500 hover:text-blue-500 transition"
            >
              <Search size={18} />
            </button>
          </form>
          {/*Cart*/}
          <div
            className="relative text-gray-500 hover:text-blue-500 transition"
            onMouseEnter={() => setMiniOpen(true)}
            onMouseLeave={() => setMiniOpen(false)}
          >
            <Link to="/cart" className="relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            {miniOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg z-50 p-4">
                <div className="font-semibold mb-3">Cart ({cartCount})</div>
                {cartItems.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-auto">
                    {cartItems.slice(0, 6).map((it) => (
                      <div key={it.product} className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold truncate">
                            {it.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ₹{(it.price * it.quantity).toFixed(2)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => dispatch(decreaseQty(it.product))}
                              className="px-2 py-1 border rounded-md text-sm"
                            >
                              -
                            </button>
                            <div className="text-sm">{it.quantity}</div>
                            <button
                              onClick={() => dispatch(increaseQty(it.product))}
                              className="px-2 py-1 border rounded-md text-sm"
                            >
                              +
                            </button>
                            <button
                              onClick={() => dispatch(removeItem(it.product))}
                              className="text-xs text-red-600 ml-3"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Link
                    to="/cart"
                    className="flex-1 text-center py-2 bg-blue-600 text-white rounded"
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="flex-1 text-center py-2 border rounded"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/*Register*/}
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 rounded-2xl py-2 hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 rounded-lg py-2 hover:bg-blue-700 transition"
              >
                <User size={18} />
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button
                className="flex items-center "
                onClick={() => setProfileDropDownOpen(!profileDropDownOpen)}
              >
                <img
                  src={user.avatar?.url}
                  alt={user?.name}
                  className="h-10 w-10 object-cover rounded-full border border-blue-600"
                />
              </button>
              {profileDropDownOpen && (
                <div className="absolute right-0 mt-2 bg-white border-gray-200 rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1 ">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/viewProducts"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Manage Products
                      </Link>
                    )}
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-s text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        handleLogout();
                        setProfileDropDownOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/*Hamburger*/}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 "
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-2 translate-y-2"}`}
      >
        <div className="flex flex-col p-5 gap-5">
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/about-us"
          >
            About
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/contact-us"
          >
            Contact
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/products"
          >
            Products
          </Link>
          {/*Mobile Menu()*/}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-semibold "
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className=" text-gray-700 hover:text-blue-600 transition font-semibold"
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar?.url}
                    alt={user?.name}
                    className="h-10 w-10 object-cover rounded-full border border-blue-600"
                  />
                </div>
                <Link to="/profile">My Profile</Link>
                {user?.role === "admin" && (
                  <>
                    <Link to="/admin/add-product">Add Product</Link>
                    <Link to="/admin/viewProducts">Manage Products</Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
