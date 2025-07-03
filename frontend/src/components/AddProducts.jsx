import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    description: "",
    category: "",
    seller: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Basic validation
    if (
      !form.name ||
      !form.imageUrl1 ||
      !form.imageUrl2 ||
      !form.imageUrl3 ||
      !form.description ||
      !form.category ||
      !form.seller ||
      !form.price
    ) {
      setErrorMsg("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/marketplace/products/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            imageUrls: [form.imageUrl1, form.imageUrl2, form.imageUrl3],
            description: form.description,
            category: form.category,
            sellerName: form.seller,
            price: Number(form.price),
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to add product");
      setSuccessMsg("Product added successfully!");
      setForm({
        name: "",
        imageUrl1: "",
        imageUrl2: "",
        imageUrl3: "",
        description: "",
        category: "",
        seller: "",
        price: "",
      });
    } catch (err) {
      setErrorMsg("Failed to add product. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar className="w-[96vw] " />
      <div className="w-[96vw] mx-auto bg-[#f6f8ed] rounded-xl shadow p-8 mt-[12vh] border border-[#e2dbc7]">
        <h1 className="text-2xl font-bold text-[#3b5d3b] mb-6 text-center">
          Add Product
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Image URL 1
            </label>
            <input
              type="url"
              name="imageUrl1"
              value={form.imageUrl1}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Image URL 2
            </label>
            <input
              type="url"
              name="imageUrl2"
              value={form.imageUrl2}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Image URL 3
            </label>
            <input
              type="url"
              name="imageUrl3"
              value={form.imageUrl3}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Seller
            </label>
            <input
              type="text"
              name="seller"
              value={form.seller}
              onChange={handleChange}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3b5d3b] font-semibold mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min={0}
              className="w-full border border-[#d2e3c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
              required
            />
          </div>
          {errorMsg && (
            <div className="text-red-500 text-sm text-center">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-green-600 text-sm text-center">
              {successMsg}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b7d7b0] hover:bg-[#a3cfa0] text-[#3b5d3b] font-bold py-2 rounded transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
      <Footer className="w-[96vw] mx-auto rounded-t-xl mt-[5vh]"  />
    </>
  );
}

export default AddProduct;
