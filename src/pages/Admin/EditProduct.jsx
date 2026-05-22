import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/product/${id}`);
        if (!res.ok) throw new Error("Failed to load product");
        const json = await res.json();
        const p = json.product;
        setProduct(p);
        setName(p.name || "");
        setDescription(p.description || "");
        setMrp(p.mrp || 0);
        setPrice(p.price || 0);
        setCategory(p.category || "");
        setStock(p.stock || 0);
        setExistingImages(p.image || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // upload new images if any
      let images = existingImages || [];
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("images", f));
        const up = await fetch("/api/v1/admin/upload", {
          method: "POST",
          body: fd,
          credentials: "include",
        });
        if (!up.ok) throw new Error("Image upload failed");
        const json = await up.json();
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

      const res = await fetch(`/api/v1/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update product");
      }
      toast.success("Product updated");
      navigate("/admin/viewProducts");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const removeExistingImage = (public_id) => {
    setExistingImages((imgs) => imgs.filter((i) => i.public_id !== public_id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
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

            <div>
              <label className="block mb-2 font-medium">Existing Images</label>
              <div className="flex gap-3 flex-wrap">
                {existingImages.length === 0 && (
                  <div className="text-sm text-gray-500">No images</div>
                )}
                {existingImages.map((img) => (
                  <div key={img.public_id} className="relative">
                    <img
                      src={img.url}
                      alt="img"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.public_id)}
                      className="absolute -top-2 -right-2 bg-white text-red-600 p-1 rounded-full border"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Upload New Images
              </label>
              <input type="file" multiple onChange={handleFiles} />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/viewProducts")}
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

export default EditProduct;
