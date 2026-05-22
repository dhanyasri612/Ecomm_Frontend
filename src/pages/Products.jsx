import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../features/products/productSlice";
import { removeErrors } from "../features/products/productSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";

const Products = () => {
  const { products, productCount, loading, error, resultsPerPage } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const [currPage, setCurrPage] = useState(pageFromURL);
  const totalPages = Math.ceil(productCount / (resultsPerPage || 8));

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currPage) {
      setCurrPage(pageNumber);
      const newSearchParams = new URLSearchParams(location.search);
      if (pageNumber === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", pageNumber);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategory = (cat) => {
    const newSearchparams = new URLSearchParams(location.search);
    newSearchparams.set("category", cat);
    newSearchparams.delete("page");
    if (cat === "All") {
      newSearchparams.delete("category");
    }
    navigate(`?${newSearchparams.toString()}`);
  };
  useEffect(() => {
    dispatch(getProduct({ keyword, page: currPage, category }));
  }, [dispatch, keyword, currPage, category]);

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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavBar />
        <main className="grow container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4 ">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 border-slate-300">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {[
                    "All",
                    "Electronics",
                    "Accessories",
                    "Footwear",
                    "Furniture",
                    "Home",
                    "Stationary",
                    "Clothing",
                  ].map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategory(cat)}
                        className="text-white font-semibold bg-blue-600 w-full py-2 rounded hover:bg-blue-700 shadow-sm shadow-blue-300"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <section className="w-full md:w-3/4 p-4 rounded bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold mb-4 ">Our Products</h3>
                <span className="text-sm text-gray-500">
                  {products?.length || 0} Products found
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              {products?.length === 0 && (
                <div className="text-center py-2">
                  <p className="text-gray-500 text-lg ">No product found</p>
                </div>
              )}
            </section>
          </div>
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
