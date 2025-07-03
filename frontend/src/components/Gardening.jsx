import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import gardeningImage from "../assets/Images/gardening.jpeg"; 
import exclaim from "../assets/exclaim.svg";
import { useNavigate } from "react-router-dom";

const tips = [
  {
    id: 1,
    title: "Watering Tips",
    desc: "Water early to reduce evaporation.",
    details:
      "Avoid watering leaves to prevent fungal growth. Use deep watering for strong roots.",
    img: "https://ideogram.ai/assets/progressive-image/balanced/response/uBUZ7jNtTbuPXoyz1MuI9A",
  },
  {
    id: 2,
    title: "Soil Preparation",
    desc: "Healthy soil is key to growth.",
    details: "Add compost and maintain pH. Mulch to retain moisture.",
    img: "https://ideogram.ai/assets/image/lossless/response/YvtKd_jpSG24V4a99hJdcQ",
  },
  {
    id: 3,
    title: "Fertilizing",
    desc: "Feed every 4-6 weeks during growth.",
    details:
      "Use balanced or organic fertilizer like compost tea. Avoid overuse.",
    img: "https://cdn.shopify.com/s/files/1/0569/9675/7697/files/use-homemade-plant-fertilizer-garden_1024x1024.jpg?v=1655088627",
  },
  {
    id: 4,
    title: "Pest Control",
    desc: "Use natural remedies for pests.",
    details: "Try neem oil, garlic spray, or companion planting.",
    img: "https://media.istockphoto.com/id/1092812454/photo/woman-spraying-flowers-in-the-garden.jpg?s=612x612&w=0&k=20&c=eelbPD_-Tmr-Al0-z9hTLzASK3chsdeiOCopB_ATDFU=",
  },
  {
    id: 5,
    title: "Sunlight",
    desc: "Ensure 6+ hrs sunlight for most veggies.",
    details: "Use shade-tolerant plants for low-light zones.",
    img: "https://cdn.shopify.com/s/files/1/0069/5854/6980/files/4._Shade_Cloths_fb65f336-36ad-4efd-8e7d-a96985d472f7_600x600.jpg?v=1717095057Q",
  },
];

const tools = [
  {
    name: "Pruning Shears",
    desc: "Trim plants and small branches.",
    img: "https://ideogram.ai/assets/image/lossless/response/woGiiwlrRhiFoYYqplspXw",
  },
  {
    name: "Watering Can",
    desc: "Controlled watering for delicate areas.",
    img: "https://ideogram.ai/assets/image/lossless/response/RAjtwyNZSHOdlUOuiSS90A",
  },
  {
    name: "Garden Trowel",
    desc: "Dig, plant and transplant easily.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlisQsYXbXv7cmHR8LOxQ4ACkS0JKVlmk9qw&s",
  },
  {
    name: "Soil pH Meter",
    desc: "Check soil acidity or alkalinity.",
    img: "https://img.crocdn.co.uk/images/products2/pr/20/00/04/50/pr2000045066.jpg?width=940&height=940",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const Gardening = () => {
  const [active, setActive] = useState(null);
      const navigate = useNavigate();
  

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
      <div className="min-h-screen mt-[12vh]  bg-[#f6f8ed] px-2 py-6">
        {/* Hero Section */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#e6f4ea] border border-[#d2e3c8] shadow p-6">
          <motion.section
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#3b5d3b]">
                Gardening Tips
              </h1>
              <p className="text-[#6b705c]">
                Master the art of gardening with essential tips and tricks.
              </p>
              <ul className="list-disc list-inside text-sm text-[#6b705c]">
                <li>Choose climate-suitable plants</li>
                <li>Enrich soil naturally</li>
                <li>Maintain watering schedules</li>
                <li>Eco-friendly pest control</li>
              </ul>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#tips"
                className="inline-block mt-4 px-4 py-2 bg-[#b7d7b0] text-[#3b5d3b] rounded hover:bg-[#a3cfa0] font-semibold"
              >
                Learn More
              </motion.a>
            </div>
            <motion.img
              whileHover={{ scale: 1.03 }}
              src={gardeningImage}
              alt="Gardening"
              className="rounded-lg shadow w-full"
            />
          </motion.section>
        </div>

        {/* Tips Section */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#f3f9f4] border border-[#d2e3c8] shadow p-6">
          <section id="tips" className="space-y-8">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                className="bg-white border border-[#e2dbc7] rounded-xl shadow p-4 grid md:grid-cols-3 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                // variants={fadeIn}
                whileHover="hover"
                variants={{ ...fadeIn, ...scaleUp }}
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src={tip.img}
                  alt={tip.title}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-[#3b5d3b]">
                    {tip.title}
                  </h2>
                  <p className="text-[#6b705c]">{tip.desc}</p>
                  <button
                    onClick={() => setActive(active === i ? null : i)}
                    className="mt-2 text-sm font-bold text-[#7ca982] hover:underline"
                  >
                    {active === i ? "Hide Details" : "Show Details"}
                  </button>
                  {active === i && (
                    <p className="mt-2 text-[#8a958a]">{tip.details}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </section>
        </div>

        {/* Tools Section */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#f3f9f4] border border-[#d2e3c8] shadow p-6">
          <motion.section
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#3b5d3b] mb-4">
              Recommended Tools
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  className="bg-white border border-[#e2dbc7] p-4 rounded-xl shadow text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.img
                    src={tool.img}
                    alt={tool.name}
                    className="w-20 h-20 object-cover mx-auto rounded-lg mb-2"
                    whileHover={{ scale: 1.1 }}
                  />
                  <h3 className="text-[#3b5d3b] font-medium">{tool.name}</h3>
                  <p className="text-sm text-[#6b705c]">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Videos Section */}
        <div className="w-[93vw] mx-auto mb-8 rounded-xl bg-[#f3f9f4] border border-[#d2e3c8] shadow p-6">
          <motion.section
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold text-[#3b5d3b] mb-6">
              Gardening Videos
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                "Kg5NR6S52FM",
                "BO8yuSTc3fo",
                "B0DrWAUsNSc",
                "e4Tk-kcOmUA",
                "XZhDdE434_o",
              ].map((id, idx) => (
                <motion.iframe
                  key={idx}
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Gardening Video ${idx + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-64 rounded-lg shadow"
                  whileHover={{ scale: 1.02 }}
                />
              ))}
            </div>
          </motion.section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Gardening;
