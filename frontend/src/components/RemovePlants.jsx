import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function RemovePlants() {
  const [plants, setPlants] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all plants (same as CardsSection.jsx)
  useEffect(() => {
    const fetchPlants = async () => {
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
        setPlants(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load plants.");
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  // Remove plant handler
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this plant?")) return;
    setRemovingId(id);
    setError("");
    try {
      await axios.delete(
        `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/plants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setPlants((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to remove plant.");
    }
    setRemovingId(null);
  };

  return (
    <>
      <Navbar className="w-[96vw]" />
      <div className="w-[96vw] mt-[12vh] mx-auto bg-white rounded-xl shadow p-6 border border-[#e2dbc7] min-h-[60vh]">
        <h1 className="text-2xl font-bold text-[#3b5d3b] mb-6 text-center">
          Remove Plants
        </h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : plants.length === 0 ? (
          <div className="text-gray-500 text-center">No plants found!</div>
        ) : (
          <div className="space-y-4">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-[#f6f8ed] border border-[#e6f4ea] rounded-lg p-4 shadow-sm"
              >
                <div className="flex-1 w-full">
                  <div className="font-semibold text-lg text-[#3b5d3b]">
                    {plant.plantName}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {plant.description}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-[#3b5d3b] font-medium">
                      Type: {plant.plantType}
                    </span>
                    {plant.region && (
                      <span className="text-[#388e3c] font-bold ml-0 sm:ml-4">
                        Region: {plant.region}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="mt-4 sm:mt-0 sm:ml-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded font-semibold transition"
                  onClick={() => handleRemove(plant.id)}
                  disabled={removingId === plant.id}
                >
                  {removingId === plant.id ? "Removing..." : "Remove"}
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

export default RemovePlants;
