import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload images first
      let images = [];
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("images", f));
        const res = await fetch("/api/v1/admin/upload", {
          method: "POST",
          body: fd,
          credentials: "include",
        });
        if (!res.ok) throw new Error("Image upload failed");
        const json = await res.json();
        images = json.images || [];
      }

      const body = {
        name,
        description,
        mrp: Number(mrp),
        price: Number(price),
        category,
        stock: Number(stock),
        image: images,
      };

      const createRes = await fetch("/api/v1/admin/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!createRes.ok) {
        const err = await createRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create product");
      }
      toast.success("Product created");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border rounded"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="MRP"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="p-3 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-3 border rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="p-3 border rounded"
              />
            </div>
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border rounded"
            />
            <input type="file" multiple onChange={handleFiles} />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddProduct;
