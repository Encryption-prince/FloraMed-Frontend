import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo/logoo.svg";
import useScrollDirection from "../hooks/useScrollDirection";
import dynamicRoutes from "./dynamicRoutes"; // 

const herbalTreatmentLink = dynamicRoutes.find(
  (route) => route.name === "Herbal Treatment"
);



const links = [
  { name: "Marketplace", path: "/marketplace" },
  { name: "Health", path: "/health" },
  { name: "Gardening", path: "/dashboard/gardening-tips" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Blog", path: "/blog" },
];

const Navbar = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const handleClick = (e) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      e.preventDefault(); // Stop default navigation
      // alert("Please login first.");
      // console.log("Please login first.");

      Swal.fire({
        html: `
    <div class="flex flex-col items-center">
      <img src="${logo}" alt="FloraMed Logo" style="width: 15rem; height: 10rem;" />
    <h2 style=" color: #065f46;">Please login first.</h2>
    </div>
  `,
        text: "Please login first.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b5d3b",
        confirmButtonAriaLabel: "OK",
        backdrop: `rgba(0,20,0,0.4)  left top no-repeat`,
        customClass: {
          popup: "bg-[#e6f4ea] hover:bg-[#b7d7b0] text-[#3b5d3b]",
        },
      });
      return;
    }
  };

  const handleClickMobile = (e) => {
    handleClick(e);
    setOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    <nav
  className={`backdrop-blur-md bg-white/80 border border-gray-200 shadow-md rounded-2xl px-6 py-3 w-[93vw] mx-auto mt-[2vh] fixed left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out will-change-transform ${
    scrollDirection === "down" ? "-translate-y-[200%]" : "translate-y-0"
  } ${className}`}
>

      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-gray-800 select-none"
        >
          FloraMed
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`relative text-sm font-medium uppercase tracking-wide ${
              location.pathname === "/" ? "text-green-700" : "text-gray-700"
            } hover:text-green-700 transition group`}
          >
            Home
            <span
              className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] bg-green-700 transition-all duration-300 ${
                location.pathname === "/"
                  ? "w-[90%]"
                  : "w-0 group-hover:w-[90%]"
              }`}
              style={{ transformOrigin: "center" }}
            ></span>
          </Link>
          {[...links, ...(herbalTreatmentLink ? [herbalTreatmentLink] : [])].map(({ name, path }) => (

            <Link
              key={name}
              to={path}
              className={`relative text-sm font-medium uppercase tracking-wide ${
                location.pathname === path ? "text-green-700" : "text-gray-700"
              } hover:text-green-700 transition group`}
              onClick={handleClick}
            >
              {name}
              <span
                className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] bg-green-700 transition-all duration-300 ${
                  location.pathname === path
                    ? "w-[90%]"
                    : "w-0 group-hover:w-[90%]"
                }`}
                style={{ transformOrigin: "center" }}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 border-t pt-4">
          <Link
            to="/"
            className={`block mb-2 text-base font-medium ${
              location.pathname === "/" ? "text-green-700" : "text-gray-700"
            } hover:text-green-700 transition`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {[...links, ...(herbalTreatmentLink ? [herbalTreatmentLink] : [])].map(({ name, path }) => (

            <Link
              key={name}
              to={path}
              className={`block mb-2 text-base font-medium ${
                location.pathname === path
                  ? "text-green-700 border-b border-green-700"
                  : "text-gray-700"
              } hover:text-green-700 transition`}
              onClick={handleClickMobile}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
