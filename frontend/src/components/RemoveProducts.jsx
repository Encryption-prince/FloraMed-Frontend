import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function RemoveProducts() {
  const [products, setProducts] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all products from marketplace
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/marketplace/products/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data); // Marketplace.jsx uses res.data, not res.data.products
      } catch (err) {
        setError("Failed to load products.");
      }
    };
    fetchProducts();
  }, []);

  // Remove product handler
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product?"))
      return;
    setRemovingId(id);
    setError("");
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(
        `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/marketplace/products/all/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to remove product");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to remove product.");
    }
    setRemovingId(null);
  };

  return (
    <>
      <Navbar className="w-[96vw] " />
      <div className="w-[96vw] mt-[12vh] mx-auto  bg-white rounded-xl shadow p-6 border border-[#e2dbc7]">
        <h1 className="text-2xl font-bold text-[#3b5d3b] mb-6 text-center">
          Remove Products
        </h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {products.length === 0 ? (
          <div className="text-gray-500 text-center">No products found.</div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-[#f6f8ed] border border-[#e6f4ea] rounded-lg p-4 shadow-sm"
              >
                <div className="flex-1 w-full">
                  <div className="font-semibold text-lg text-[#3b5d3b]">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-[#3b5d3b] font-medium">
                      Seller: {product.sellerName}
                    </span>
                    <span className="text-[#388e3c] font-bold ml-0 sm:ml-4">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
                <button
                  className="mt-4 sm:mt-0 sm:ml-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded font-semibold transition"
                  onClick={() => handleRemove(product._id)}
                  disabled={removingId === product._id}
                >
                  {removingId === product._id ? "Removing..." : "Remove"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer className="w-[96vw] mx-auto rounded-t-xl mt-[5vh]"  />
    </>
  );
}

export default RemoveProducts;
