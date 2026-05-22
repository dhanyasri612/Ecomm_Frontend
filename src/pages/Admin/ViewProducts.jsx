import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../app/apiClient.js";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/v1/admin/viewProducts"), {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      setProducts(json.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(apiUrl(`/v1/product/${id}`), {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted");
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          {loading ? (
            <div>Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-gray-500">No products</div>
          ) : (
            <div className="space-y-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={p.image?.[0]?.url || "https://via.placeholder.com/80"}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      ₹{p.price} • {p.category}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 border rounded text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewProducts;
