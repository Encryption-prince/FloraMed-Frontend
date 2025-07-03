import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import exclaim from "../assets/exclaim.svg";

function Marketplace({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/marketplace/products/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    const existing = cartItems.find((item) => item.id === product.productId);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.productId
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.productId,
          title: product.name,
          price: product.price,
          image: product.imageUrls?.[0],
          count: 1,
        },
      ]);
    }
  };

  const handleRemove = (product) => {
    const existing = cartItems.find((item) => item.id === product.productId);
    if (existing?.count > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.productId
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item.id !== product.productId));
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if(sessionStorage.getItem("token") === null) {

    return (
    <>
    <div className="flex flex-col items-center justify-center py-24">
            <img src={exclaim} alt="Exclaim" className="w-24 h-24 mb-4" />
            <p className="text-gray-400 text-lg mb-6">You haven't logged in.</p>
            <p className="text-gray-400 text-lg mb-6">Please login and comeback.</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-green-600 cursor-pointer text-white font-semibold hover:bg-green-700 transition text-lg shadow"
            >
              Go to Home
            </button>
          </div>
    </>
    )
  }

  return (
    <>
      <Navbar className="" />
      <div className="p-6 mt-[12vh] rounded-xl mx-auto w-[93vw] my-[2vh] min-h-screen bg-[#f6f8ed]">
        <h1 className="text-3xl font-bold text-[#3b5d3b] mb-6 text-center">
          Herbal Marketplace
        </h1>

        <input
          type="text"
          placeholder="Search product..."
          className="w-full max-w-md mx-auto mb-6 px-4 py-2 border border-[#d2e3c8] rounded-xl shadow bg-[#f3f9f4] text-[#3b5d3b] placeholder-[#8a958a] focus:outline-none focus:ring-2 focus:ring-[#b7d7b0]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            // TEMPORARILY OVERRIDE IMAGE URLS FOR VISUAL TESTING
            product.imageUrls = [
              "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
              "https://images.pexels.com/photos/10974482/pexels-photo-10974482.jpeg",
            ];

            return (
              <div
                key={product.productId}
                className="border border-[#d2e3c8] rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer bg-[#f3f9f4]"
                onClick={() => openModal(product)}
              >
                <Carousel
                  showArrows={false}
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  autoPlay={false}
                  infiniteLoop={false}
                  className="mb-3 pointer-events-none"
                >
                  {product.imageUrls.map((url, idx) => (
                    <div key={idx}>
                      <img
                        src={url}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  ))}
                </Carousel>

                <h2 className="text-xl font-semibold text-[#3b5d3b]">
                  {product.name}
                </h2>
                <p className="text-sm text-[#6b705c] mb-2">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-[#3b5d3b]">
                  ₹{product.price}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(product);
                    }}
                    className="flex-1 cursor-pointer border border-[#7ca982] text-[#3b5d3b] py-1 rounded hover:bg-[#e6f4ea] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(product);
                    }}
                    className="flex-1 border cursor-pointer border-[#7ca982] text-[#3b5d3b] py-1 rounded hover:bg-[#b7d7b0] transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Product Details"
          className="bg-white p-6 max-w-3xl w-full mx-auto rounded-xl shadow-lg border border-[#e2dbc7]"
          overlayClassName="fixed inset-0 bg-black/80 flex justify-center items-center"
        >
          {selectedProduct && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3b5d3b]">
                {selectedProduct.name}
              </h2>

              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                infiniteLoop
                autoPlay
                interval={3000}
                className="rounded"
              >
                {selectedProduct.imageUrls.map((url, idx) => (
                  <div key={idx}>
                    <img
                      src={url}
                      alt={`${selectedProduct.name} ${idx + 1}`}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                ))}
              </Carousel>

              <p className="text-[#6b705c]">{selectedProduct.description}</p>
              <p className="text-sm text-[#8a958a]">
                Category: {selectedProduct.category}
              </p>
              <p className="text-sm text-[#8a958a]">
                Seller: {selectedProduct.sellerName}
              </p>
              <p className="text-xl font-bold text-[#3b5d3b]">
                ₹{selectedProduct.price}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    handleAdd(selectedProduct);
                    navigate("/cart");
                  }}
                  className="flex-1 cursor-pointer border border-[#7ca982] text-[#3b5d3b] py-2 rounded hover:bg-[#e6f4ea] transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAdd(selectedProduct)}
                  className="flex-1 cursor-pointer border border-[#7ca982] text-[#3b5d3b] py-2 rounded hover:bg-[#b7d7b0] transition"
                >
                  <BsCart2 className="inline mr-1 mb-1" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(selectedProduct)}
                  className="flex-1 cursor-pointer border border-red-400 text-red-500 py-2 rounded hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
              <button
                onClick={closeModal}
                className="w-full mt-4 border border-gray-300 cursor-pointer text-gray-600 py-2 rounded hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
        {cartItems.length > 0 && (
          <div
            className="fixed bottom-8 left-8 bg-[#3b5d3b] text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <BsCart2 size={24} />
            <span className="ml-2 text-lg font-bold">
              {cartItems.reduce((total, item) => total + item.count, 0)}
            </span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Marketplace;
