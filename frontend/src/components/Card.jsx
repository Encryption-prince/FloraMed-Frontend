import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

function Card({ id, image, title, type, onBuyNow, isInitiallyBookmarked }) {
  const [isSaved, setIsSaved] = useState(isInitiallyBookmarked || false);

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
        const bookmarkedPlantIds = bookmarks.map((b) => b.plant.id);
        setIsSaved(bookmarkedPlantIds.includes(id));
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [id]);

  const handleSave = async (event) => {
    event.stopPropagation();
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      if (!isSaved) {
        await axios.post(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/add/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/remove/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
    }
  };

  return (
    <div
      className="bg-[#f3f9f4] border border-[#d2e3c8] rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
      onClick={onBuyNow}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-cover rounded-md"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#3b5d3b]">{title}</h3>
          <button
            className="p-1 rounded-full hover:bg-[#e6f4ea] transition cursor-pointer"
            onClick={handleSave}
            aria-label={isSaved ? "Remove Bookmark" : "Add Bookmark"}
          >
            {isSaved ? (
              <FaBookmark className="text-[#7ca982] text-xl" />
            ) : (
              <FaRegBookmark className="text-[#8a958a] text-xl" />
            )}
          </button>
        </div>
        <p className="text-xs text-[#7ca982]">{type}</p>
      </div>
    </div>
  );
}

export default Card;
