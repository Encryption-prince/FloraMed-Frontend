import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function CardsSection({ cartItems, setCartItems, onSave }) {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


 

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const bookmarks = response.data;
        const ids = bookmarks.map((b) => b.plant.id);
        setBookmarkedIds(ids);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  // Fetch plant data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/plants/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCardsData(response.data);
      } catch (error) {
        console.error("Failed to fetch plant data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleAdd = (index) => {
    const item = cardsData[index];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.plantname === item.plantname
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.plantname === item.plantname
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, count: 1 }]);
    }
  };

  const handleRemove = (index) => {
    const item = cardsData[index];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.plantname === item.plantname
    );

    if (existingItem && existingItem.count > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.plantname === item.plantname
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.plantname !== item.plantname)
      );
    }
  };

  const filteredCards = cardsData.filter((card) =>
    card.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section  className="py-10 px-2 bg-[#f6f8ed] min-h-screen rounded-3xl mt-8 mx-auto w-[96vw] shadow border border-[#d2e3c8]">
      <h2  className="text-3xl font-bold text-center text-[#3b5d3b] mb-10">
        Our Herbal Picks <span className="text-[#7ca982]">🌱</span>
      </h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#d2e3c8] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b] placeholder:text-[#8a958a] transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCards.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            image={card.imageUrl}
            title={card.plantName}
            type={card.plantType}
            count={
              cartItems.find((item) => item.plantname === card.plantname)
                ?.count || 0
            }
            onAdd={() => handleAdd(index)}
            onRemove={() => handleRemove(index)}
            onBuyNow={() => openModal(card)}
            onSave={() => onSave(card)}
            isInitiallyBookmarked={bookmarkedIds.includes(card.id)}
          />
        ))}
      </div>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Plant Details"
  className="bg-white rounded-2xl p-4 md:p-6 max-w-6xl w-full mx-auto shadow-2xl overflow-hidden"
  overlayClassName="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
>
  {selectedCard && (
    <div className="flex flex-col md:flex-row gap-6 h-[80vh] overflow-hidden">
      {/* LEFT: 3D View */}
      <div className="w-full md:w-1/2 h-72 md:h-full flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        <iframe
          title={selectedCard.plantName}
          src={selectedCard.image3DUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          className="w-full h-full object-contain"
        />
      </div>

      {/* RIGHT: Details */}
      <div className="w-full md:w-1/2 flex flex-col overflow-y-auto pr-2">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          {selectedCard.plantName}
        </h1>

        <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
          {selectedCard.description}
        </p>

        <div className="space-y-2 text-gray-800 text-sm md:text-base">
          <p>
            <span className="font-semibold">🌿 Scientific Name:</span>{" "}
            <i>{selectedCard.scientificName}</i>
          </p>
          <p>
            <span className="font-semibold">📍 Region:</span>{" "}
            {selectedCard.region}
          </p>
          <p>
            <span className="font-semibold">🧬 Type:</span>{" "}
            {selectedCard.plantType}
          </p>
          <p>
            <span className="font-semibold">💊 Medicinal Uses:</span>{" "}
            {selectedCard.uses}
          </p>
        </div>

        {selectedCard.voiceDescriptionUrl && (
          <audio
            controls
            className="w-full mt-6 rounded-md border border-gray-300"
          >
            <source
              src={selectedCard.voiceDescriptionUrl}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        )}

        <button
          onClick={closeModal}
          className="mt-6 self-center md:self-end border border-green-600 text-green-600 hover:bg-green-50 font-medium px-6 py-2 rounded-lg shadow-sm transition-transform transform hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>

      {cartItems.length > 0 && (
        <div
          className="fixed bottom-8 left-8 bg-[#7ca982] text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50"
          onClick={() => navigate("/cart")}
        >
          <BsCart2 size={24} />
          <span className="ml-2 text-lg font-bold">
            {cartItems.reduce((total, item) => total + item.count, 0)}
          </span>
        </div>
      )}
    </section>
  );
}

export default CardsSection;
