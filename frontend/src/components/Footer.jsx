import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiPostgresql,
  SiVite,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";
import { FaIcons } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilepic: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      profilePictureUrl: formData.profilepic
        ? formData.profilepic
        : "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png",
      message: formData.message,
    };

    try {
      const response = await fetch(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/feedback/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFormData({
          name: "",
          email: "",
          profilePictureUrl: "",
          message: "",
        });
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
    console.log(payload);
  };

  return (
    <footer className="bg-[#f6f8ed] text-[#3b5d3b] px-4 py-8 border-t border-[#d2e3c8]">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4 items-start">
        {/* Logo */}
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-bold text-[#3b5d3b]">FloraMed</h2>
        </div>

        {/* Address and email */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1 text-[#7ca982]" />
            <p>
              Techno Main Salt Lake,
              <br />
              Kolkata, 700091 (West Bengal)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#7ca982]" />
            <p>floramed@gmail.com</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-4 items-start">
          <p className="font-semibold text-[#3b5d3b]">Technology Stack Used:</p>
          <div className="flex gap-3 text-xl">
            <FaReact className="text-blue-500" title="React" />
            <SiJavascript
              className="text-yellow-500"
              title="JavaScript/Node.js"
            />
            <SiPostgresql
              className="text-blue-700"
              title="PostgreSQL/Database"
            />
            <SiVite
              className="text-purple-500"
              title="Vite/VR Icon Placeholder"
            />
            <SiTailwindcss className="text-sky-400" title="TailwindCSS" />
            <SiFramer className="text-pink-500" title="Framer Motion" />
            <FaIcons className="text-gray-600" title="React Icons" />
          </div>
          <Link
            to="/about"
            className="text-[#7ca982] hover:text-[#3b5d3b] transition"
          >
            About Us
          </Link>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <p className="font-semibold text-[#3b5d3b]">Leave a Review</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="px-3 py-2 border border-[#d2e3c8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="px-3 py-2 border border-[#d2e3c8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
          />
          <input
            type="url"
            name="profilepic"
            value={formData.profilepic}
            onChange={handleChange}
            placeholder="Your Profile Picture URL (optional)"
            className="px-3 py-2 border border-[#d2e3c8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Review"
            rows="4"
            maxLength="200"
            style={{ resize: "none" }}
            required
            className="px-3 py-2 border border-[#d2e3c8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#7ca982] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#3b5d3b] transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-[#d2e3c8]" />

      {/* Footer Bottom */}
      <p className="text-center text-xs text-[#6b705c]">
        © Copyright {year}{" "}
        <span className="font-semibold text-[#3b5d3b]">FloraMed</span> – All
        Rights Reserved. Designed and Developed by Team FloraMed
      </p>
    </footer>
  );
};

export default Footer;
