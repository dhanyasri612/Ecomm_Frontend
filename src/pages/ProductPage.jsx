import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import {
  Calendar,
  MessageSquare,
  Minus,
  PackageIcon,
  PackageX,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { calculateDiscount, formatDate } from "../utils/formatter";
import { apiUrl } from "../app/apiClient.js";

const ProductPage = () => {
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewComment, setReviewComment] = useState("");
  const { loading, error, product } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong";
      toast.error(errorMessage);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  const increaseQty = () => {
    if (product && quantity < product.stock) setQuantity((q) => q + 1);
  };
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const addToCartHandler = () => {
    if (!product) return;
    const item = {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image?.[0]?.url || "",
      seller: product.seller || "Shop-Mart",
      stock: product.stock || 0,
    };
    dispatch(addItem(item));
    toast.success("Added to cart");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!userRating || !reviewComment.trim()) {
      toast.error("Please provide rating and comment");
      return;
    }
    try {
      const res = await fetch(apiUrl("/v1/review"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          rating: userRating,
          comment: reviewComment,
          productId: id,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed" }));
        throw new Error(err.message || "Failed to post review");
      }
      toast.success("Review posted");
      setReviewComment("");
      setUserRating(0);
      dispatch(getProductDetails(id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to post review");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 ">
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-8 gap-12">
          {/* Image gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src={
                  product?.image?.[0]?.url ||
                  "https://via.placeholder.com/600x600?text=No+Image"
                }
                alt={product?.name || "Product"}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                title={product?.name}
              />
            </div>
          </div>
          {/* Product Info */}
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold text-gray-900 mb-2">
              {product?.name}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Rating value={product?.ratings} disabled={true} />
              <span className="text-gray-500 text-sm font-medium">
                {product?.numOfReviews} Verified Reviews
              </span>
            </div>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-4xl font-semibold text-amber-600">
                ₹{product?.price}
              </span>
              <span className="line-through text-gray-400 text-lg">
                ₹{product?.mrp}
              </span>
              <span className="font-bold text-green-600 text-sm bg-green-50 py-1 px-2 rounded">
                {calculateDiscount(product?.price, product?.mrp)}% OFF
              </span>
            </div>
            <p className="text-g text-gray-500 leading-relaxed mb-8">
              {product?.description}
            </p>
            <div className="border-t border-gray-100 mb-8 pt-8">
              <div className="flex items-center gap-2 mb-6">
                {product?.stock > 1 ? (
                  <>
                    <PackageIcon className="text-green-600 h-5 w-5" />
                    <span className="text-green-700 font-semibold text-sm">
                      In Stock - {product.stock} Available
                    </span>
                  </>
                ) : (
                  <>
                    <PackageX className="text-red-600 h-5 w-5" />
                    <span className="text-red-700 font-semibold text-sm">
                      Out of Stock{" "}
                      <span className="text-red-700 line-through text-sm font-semibold">
                        (Available)
                      </span>
                    </span>
                  </>
                )}
              </div>
              {product?.stock > 0 && (
                <div className="flex flex-wrap items-center pt-4 gap-30">
                  <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={decreaseQty}
                      className="p-4 hover:bg-gray-50 hover:text-amber-600 trnsition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-gray-800 font-bold text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQty}
                      className="p-4 hover:bg-gray-50 hover:text-amber-600 trnsition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    className="flex-1 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl justify-center transition-all shadow-xl shadow-blue-100 acrive:scale-95"
                  >
                    <ShoppingCart />
                    Add to cart
                  </button>
                </div>
              )}
            </div>
            {/*Review Form*/}
            <form
              onSubmit={submitReview}
              className="border border-slate-100 bg-slate-50 p-6 rounded-2xl"
            >
              <h3 className="flex gap-3 items-center font-bold mb-3 text-md uppercase tracking-tight">
                <MessageSquare size={18} className="text-amber-700" />
                Share your Feedback
              </h3>
              <div className="mb-4">
                <Rating
                  value={userRating}
                  disabled={false}
                  onRatingChange={(r) => setUserRating(r)}
                />
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="How was the product quality and delivery?"
                className="w-full p-4 rounded-xl border-white focus:border-amber-400 focus:ring-0 bg-white outline-none text-sm min-h-24 transition-all shadow-lg shadow-amber-50"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-slate-900 text-white uppercase font-semibold tracking-tight py-2 rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-300"
              >
                Post Review
              </button>
            </form>
          </div>
        </div>
        {/*Customer Review Section*/}
        <section className="mt-20">
          <div className="w-full mb-5 text-2xl font-bold text-gray-900 border-l-4 border-amber-500 px-2 rounded">
            Customer Stories
          </div>
          <Reviews reviews={product?.reviews} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
