import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  const handleIncrease = (id) => dispatch(increaseQty(id));
  const handleDecrease = (id) => dispatch(decreaseQty(id));
  const handleRemove = (id) => dispatch(removeItem(id));

  const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  onIncrease={() => handleIncrease(item.product)}
                  onDecrease={() => handleDecrease(item.product)}
                  onRemove={() => handleRemove(item.product)}
                />
              ))}
            </div>

            <aside className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t my-4" />
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() =>
                  navigate(isAuthenticated ? "/checkout" : "/login", {
                    state: isAuthenticated ? undefined : { from: "/checkout" },
                  })
                }
                className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full mt-3 border border-gray-200 py-2 rounded-xl text-sm"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
