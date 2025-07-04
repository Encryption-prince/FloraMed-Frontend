import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

Modal.setAppElement("#root");

const HerbalistsMyPlants = () => {
  const [cardsData, setCardsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/plants/my-plants",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setCardsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <Navbar className='w-[96vw]'/>
      <div className="min-h-screen mt-[12vh] bg-[#f6f8ed] w-[96vw] mx-auto rounded-xl shadow-md mb-[5vh]">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10 mt-10">
        Your Added Plants 🌱
      </h2>
      <div className="p-6">
        {cardsData.length === 0 ? (
          <div className="text-center mt-10 text-gray-600 text-lg">
            You have not added any plants yet!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cardsData.map((card, index) => (
              <div
                key={card.id}
                className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => openModal(card)}
              >
                <img
                  src={card.imageUrl}
                  alt={card.plantName}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 text-xl font-bold">{card.plantName}</h3>
                <p className="text-sm text-gray-600">{card.plantType}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Plant Details"
        className="bg-white p-4 sm:p-6 rounded shadow-lg max-w-6xl mx-auto"
        overlayClassName="fixed inset-0 backdrop-filter backdrop-blur-md bg-opacity-50 flex justify-center items-center border-0"
        style={{ overlay: { overflow: "hidden", zIndex: 9999 } }}
      >
        {selectedCard && (
          <div className="flex flex-col lg:flex-row p-4 w-full max-w-5xl h-[80vh] sm:h-[70vh] overflow-hidden bg-white rounded-lg">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-0 lg:pr-4">
              <div className="bg-gray-100 h-64 sm:h-80 flex items-center justify-center">
                <iframe
                  title={selectedCard.plantName}
                  src={selectedCard.image3DUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  className="h-full object-contain w-full"
                ></iframe>
              </div>
            </div>

            <div className="w-full lg:w-1/2 overflow-y-auto p-4 bg-white rounded shadow mt-4 lg:mt-0 h-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedCard.plantName}
              </h1>
              <p className="mb-4 text-sm sm:text-base text-gray-700">
                {selectedCard.description}
              </p>
              <p>
                <span className="font-semibold">Scientific name: </span>{" "}
                <i>{selectedCard.scientificName}</i>
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {selectedCard.region}
              </p>
              <p>
                <span className="font-semibold">Type:</span>{" "}
                {selectedCard.plantType}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Medicinal uses:</span>{" "}
                {selectedCard.uses}
              </p>
              <audio controls className="mb-4 w-full">
                <source
                  src={selectedCard.voiceDescriptionUrl}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </Modal>
      </div>
        <Footer className="w-[96vw] mx-auto rounded-t-xl"  />
      
    </>
  );
};

export default HerbalistsMyPlants;
