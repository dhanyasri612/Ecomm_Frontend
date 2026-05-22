import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { clearCart } from "../features/cart/cartSlice";
import { apiClient } from "../app/apiClient.js";

const initialAddress = {
  address: "",
  city: "",
  state: "",
  country: "India",
  pinCode: "",
  phoneNo: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user?.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const itemPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const shippingPrice = itemPrice > 500 ? 0 : 40;
  const taxPrice = Number((itemPrice * 0.05).toFixed(2));
  const totalPrice = Number((itemPrice + shippingPrice + taxPrice).toFixed(2));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: "/checkout" } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  const updateAddress = (field, value) => {
    setShippingAddress((current) => ({ ...current, [field]: value }));
  };

  const buildOrderPayload = () => ({
    shippingAddress: {
      ...shippingAddress,
      pinCode: Number(shippingAddress.pinCode),
      phoneNo: Number(shippingAddress.phoneNo),
    },
    orderItems: cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      product: item.product,
    })),
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      // Demo flow: no external gateway. Create order directly and mark paid for card.
      const paymentInfo =
        paymentMethod === "card"
          ? { id: `demo_card_${Date.now()}`, status: "Paid" }
          : { id: `cod_${Date.now()}`, status: "Pending" };

      const { data } = await apiClient.post(
        "/v1/new/order",
        {
          ...buildOrderPayload(),
          paymentInfo,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      setOrderDetails(data?.order || null);
      dispatch(clearCart());
      toast.success("Order placed successfully (demo).");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to process payment right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10">
        {orderDetails && (
          <section className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-lg shadow-emerald-100">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                  Order confirmed
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Your payment went through and the order is now processing.
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Order ID:{" "}
                  <span className="font-semibold text-slate-900">
                    {orderDetails._id}
                  </span>
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <div className="flex justify-between gap-8">
                  <span>Payment</span>
                  <span className="font-semibold text-slate-900">
                    {orderDetails.paymentInfo?.status || "Paid"}
                  </span>
                </div>
                <div className="mt-2 flex justify-between gap-8">
                  <span>Current status</span>
                  <span className="font-semibold text-slate-900">
                    {orderDetails.orderStatus || "processing"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { label: "Ordered", state: "completed" },
                { label: "Processing", state: "active" },
                { label: "Delivered", state: "pending" },
              ].map((step, index) => (
                <div
                  key={step.label}
                  className={`rounded-2xl border p-4 ${step.state === "completed" ? "border-emerald-300 bg-white" : step.state === "active" ? "border-amber-300 bg-amber-50" : "border-gray-200 bg-white/80"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {step.label}
                    </span>
                    <span
                      className={`h-3 w-3 rounded-full ${step.state === "completed" ? "bg-emerald-500" : step.state === "active" ? "bg-amber-500" : "bg-gray-300"}`}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {step.state === "completed"
                      ? "Order received and saved to your account."
                      : step.state === "active"
                        ? "We are preparing the shipment."
                        : "This will update when the package is delivered."}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Continue shopping
              </button>
              <button
                type="button"
                onClick={() => setOrderDetails(null)}
                className="rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                Place another order
              </button>
            </div>
          </section>
        )}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Secure Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Shipping and payment
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Review your cart, enter delivery details, and choose how you want to
            pay.
          </p>
        </div>

        {!orderDetails && (
          <form
            className="grid gap-8 lg:grid-cols-[1.6fr_1fr]"
            onSubmit={handleSubmit}
          >
            <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-blue-100 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-900">
                Delivery address
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(event) =>
                    updateAddress("address", event.target.value)
                  }
                  placeholder="Street address"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:col-span-2"
                  required
                />
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(event) =>
                    updateAddress("city", event.target.value)
                  }
                  placeholder="City"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(event) =>
                    updateAddress("state", event.target.value)
                  }
                  placeholder="State"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(event) =>
                    updateAddress("country", event.target.value)
                  }
                  placeholder="Country"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <input
                  type="number"
                  value={shippingAddress.pinCode}
                  onChange={(event) =>
                    updateAddress("pinCode", event.target.value)
                  }
                  placeholder="PIN code"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <input
                  type="number"
                  value={shippingAddress.phoneNo}
                  onChange={(event) =>
                    updateAddress("phoneNo", event.target.value)
                  }
                  placeholder="Phone number"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">
                  Payment method
                </h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${paymentMethod === "razorpay" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
                  >
                    <input
                      type="radio"
                      className="mr-3"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      name="payment"
                    />
                    <span className="font-semibold text-slate-900">
                      Razorpay
                    </span>
                    <p className="mt-1 text-sm text-slate-600">
                      Pay securely with UPI, cards, wallets, and net banking.
                    </p>
                  </label>
                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
                  >
                    <input
                      type="radio"
                      className="mr-3"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      name="payment"
                    />
                    <span className="font-semibold text-slate-900">
                      Cash on delivery
                    </span>
                    <p className="mt-1 text-sm text-slate-600">
                      Pay when the order reaches your doorstep.
                    </p>
                  </label>
                </div>

                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
                  {paymentMethod === "razorpay"
                    ? "Razorpay checkout will open after you click Pay now."
                    : "You will complete payment after delivery."}
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
              <h2 className="text-xl font-semibold text-slate-900">
                Order summary
              </h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>₹{itemPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingPrice === 0
                      ? "Free"
                      : `₹${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{taxPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="my-5 border-t border-slate-200" />
              <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing payment..."
                  : paymentMethod === "razorpay"
                    ? "Pay with Razorpay"
                    : "Place COD order"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to cart
              </button>
            </aside>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
