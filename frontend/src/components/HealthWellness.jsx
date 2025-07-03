import React, { useState } from "react";
import Modal from "./Modal";
import Footer from "./Footer";
import Navbar from "./Navbar";
import exclaim from "../assets/exclaim.svg";
import { useNavigate } from "react-router-dom";

import skincare from "../assets/health/skincare.png";
import haircare from "../assets/health/haircare.png";
import diseases from "../assets/health/diseases.png";
import nutrition from "../assets/health/nutrition.png";
import fitness from "../assets/health/fitness.png";
import mentalhealth from "../assets/health/mentalhealth.png";

const categories = [
  {
    name: "Skin Care",
    imageUrl: skincare,
    plants: ["Aloe Vera", "Neem", "Turmeric", "Tulsi"],
  },
  {
    name: "Hair Care",
    imageUrl: haircare,
    plants: ["Bhringraj", "Amla", "Hibiscus", "Fenugreek"],
  },
  {
    name: "Diseases",
    imageUrl: diseases,
    plants: ["Ashwagandha", "Tulsi", "Ginger"],
  },
  {
    name: "Nutrition",
    imageUrl: nutrition,
    plants: ["Moringa", "Spinach", "Broccoli"],
  },
  {
    name: "Fitness",
    imageUrl: fitness,
    plants: ["Wheatgrass", "Spirulina", "Ginseng"],
  },
  {
    name: "Mental Health",
    imageUrl: mentalhealth,
    plants: ["Lavender", "Chamomile", "Ashwagandha"],
  },
];

const wellnessTips = [
  {
    title: "Hydrate Regularly",
    description:
      "Drinking enough water is crucial for maintaining optimal health. It aids digestion, skin health, and regulates body temperature.",
  },
  {
    title: "Eat Whole Foods",
    description:
      "Incorporate more fruits, vegetables, whole grains, and nuts into your diet to improve overall wellness and energy levels.",
  },
  {
    title: "Daily Exercise",
    description:
      "Physical activity boosts your immune system, improves mood, and helps maintain a healthy weight.",
  },
  {
    title: "Mental Wellness",
    description:
      "Practicing mindfulness and meditation can significantly reduce stress and promote emotional balance.",
  },
];

const HealthWellness = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
  

  const openModal = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };


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
    <div className="bg-[#f6f8ed]">
      <Navbar />

      <div className="min-h-screen mt-[12vh]   px-2 py-8">
        {/* Hero Section */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#e6f4ea] border border-[#d2e3c8] shadow p-6 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#3b5d3b]">
            Explore Health & Wellness Categories
          </h2>
          <p className="text-lg mb-4 text-[#6b705c] max-w-2xl">
            Discover the power of natural remedies and holistic living through
            our curated categories. Learn more about plants that can improve
            your skin, hair, fitness, and overall well-being.
          </p>
        </div>

        {/* Category Cards */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#f3f9f4] border border-[#d2e3c8] shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-xl overflow-hidden transform transition hover:scale-105 cursor-pointer duration-300 border border-[#e2dbc7] flex flex-col"
                onClick={() => openModal(category)}
              >
                <img
                  className="w-full h-44 object-cover"
                  src={category.imageUrl}
                  alt={category.name}
                />
                <div className="p-4 text-left bg-[#e6f4ea] flex-1 flex flex-col">
                  <h3 className="text-xl pb-2 font-semibold text-[#3b5d3b]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#6b705c] flex-1">
                    Explore plants and herbs known for their healing and
                    wellness properties.
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-[#7ca982] font-semibold">
                      Key Plants:{" "}
                    </span>
                    <span className="text-xs text-[#8a958a]">
                      {category.plants.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Tips */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#f3f9f4] border border-[#d2e3c8] shadow p-6">
          <h2 className="text-2xl font-bold mb-8 text-[#3b5d3b] text-center">
            Wellness Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {wellnessTips.map((tip, index) => (
              <div
                key={index}
                className="bg-[#e6f4ea] text-left p-6 rounded-xl shadow border border-[#d2e3c8] flex flex-col"
              >
                <h3 className="text-lg font-semibold text-[#3b5d3b] mb-2">
                  {tip.title}
                </h3>
                <p className="text-[#6b705c] text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#e6f4ea] border border-[#d2e3c8] shadow p-6 text-center">
          <h3 className="text-2xl font-bold text-[#3b5d3b] mb-4">
            Take a Step Towards Better Health
          </h3>
          <p className="text-lg text-[#6b705c] mb-2 max-w-2xl mx-auto">
            Embrace natural living and enhance your well-being by integrating
            these herbs and practices into your daily life. Join us in a journey
            towards a healthier, balanced lifestyle.
          </p>
        </div>

        {selectedCategory && (
          <Modal category={selectedCategory} closeModal={closeModal} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HealthWellness;
