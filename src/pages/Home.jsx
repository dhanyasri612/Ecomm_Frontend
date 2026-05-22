import React from "react";
import NavBar from "../components/NavBar";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
/* const products = [
  {
    _id: "69cb8db84f8cbe4237304102",
    name: "Wireless Headphones",
    description: "Noise cancelling over-ear headphones",
    price: 2999,
    ratings: 4.5,
    image: [
      {
        public_id: "headphones_1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        _id: "69cb8db84f8cbe4237304103",
      },
    ],
    category: "Electronics",
    stock: 25,
    numOfReviews: 0,
    reviews: [],
    user: "69c55cbb1f272166921c4302",
    createdAt: "2026-03-31T09:02:48.924Z",
    __v: 0,
  },
  {
    _id: "69cb8e054f8cbe4237304106",
    name: "Smartphone",
    description: "Latest Android smartphone with AMOLED display",
    price: 15999,
    ratings: 4.2,
    image: [
      {
        public_id: "phone_1",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        _id: "69cb8e054f8cbe4237304107",
      },
    ],
    category: "Electronics",
    stock: 15,
    numOfReviews: 0,
    reviews: [],
    user: "69c55cbb1f272166921c4302",
    createdAt: "2026-03-31T09:04:05.257Z",
    __v: 0,
  },
  {
    _id: "69cb8e424f8cbe423730410a",
    name: "Laptop",
    description: "Lightweight laptop for students and professionals",
    price: 55999,
    ratings: 4.6,
    image: [
      {
        public_id: "laptop_1",
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        _id: "69cb8e424f8cbe423730410b",
      },
    ],
    category: "Electronics",
    stock: 10,
    numOfReviews: 0,
    reviews: [],
    user: "69c55cbb1f272166921c4302",
    createdAt: "2026-03-31T09:05:06.842Z",
    __v: 0,
  },
  {
    _id: "69cb8e774f8cbe423730410e",
    name: "Backpack",
    description: "Durable travel backpack with multiple compartments",
    price: 1299,
    ratings: 1,
    image: [
      {
        public_id: "bag_1",
        url: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1974&auto=format&fit=crop",
        _id: "69cb8e774f8cbe423730410f",
      },
    ],
    category: "Accessories",
    stock: 30,
    numOfReviews: 0,
    reviews: [],
    user: "69c55cbb1f272166921c4302",
    createdAt: "2026-03-31T09:05:59.313Z",
    __v: 0,
  },
]; */
const Home = () => {
  const { products, productCount, loading, error } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({keyword:""}));
  }, [dispatch]);

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

  return loading ? (
    <Loader />
  ) : (
    <>
      <PageTitle title={"Home | E-Commerce"} />
      <NavBar />
      <ImageSlider />
      <div className="mt-12 p-8 flex flex-col text-gray-900 items-center justify-around">
        <h1 className="text-4xl text-blue-700 font-semibold text-center drop-shadow-sm mb-20">
          Latest Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
