import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer"; 
import { useNavigate } from "react-router-dom";

import exclaim from "../assets/exclaim.svg"; 
import {
  Home,
  Sprout,
  Leaf,
  MessageCircle,
  LogOut,
  BookOpen,
  // Search, // removed
} from "lucide-react";
import "./dashboard.css";

const dashboardTiles = [
  { label: "My Herbs", icon: <Sprout size={32} />, to: "/myherbs" },
  {
    label: "Gardening Tips",
    icon: <Leaf size={32} />,
    to: "/dashboard/gardening-tips",
  },
  { label: "Health Tips", icon: <MessageCircle size={32} />, to: "/health" },
  { label: "Add Plants", icon: <Sprout size={32} />, to: "/add-plants" },
  { label: "Book Appointment", icon: <BookOpen size={32} />, to: "/doctors" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsdata, setNewsdata] = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);
   const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setUser("User");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUser(data.name);
        setUserData(data);
        setLoading(false);
        // console.log("User data fetched successfully:", data);
        
      } catch (error) {
        setUser("User");
      }
    };
    fetchUserData();
  }, []);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_81924bea37683a2602e8855a2c144f6c1c31a&q=medicinal%20herbs%20OR%20medicinal%20herbs%20OR%20herbs%20OR%20ayurveda%20OR%20homeopathy&country=in&language=en&category=health,science&size=6"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setNewsdata(data);
        setNewsLoading(false);
      } catch (error) {
        // ignore
      }
    };
    fetchNews();
  }, []);

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/auth/logout",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Logout failed");
      sessionStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {}
  };

  if (loading || newsLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8ed]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
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
    <div className="min-h-screen bg-[#f6f8ed] flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#e6f4ea] border border-[#d2e3c8] px-4 py-3 rounded-xl w-[94vw] mx-auto mt-[2vh]">
        <div className="flex items-center justify-between w-full">
          {/* Center: Floramed */}
          <span className=" text-2xl sm:text-2xl font-bold text-[#3b5d3b] tracking-tight select-none">
            Floramed
          </span>
          {/* Right: Marketplace & Blog */}
          <div className="flex items-center gap-2 ml-auto">
            <Link
              to="/marketplace"
              className="flex items-center gap-1 text-[#3b5d3b] px-4 py-1.5 font-semibold text-xs sm:text-sm transition relative group"
            >
              Marketplace
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-0 h-[2px] bg-[#3b5d3b] transition-all duration-300 group-hover:w-[70%]"
                style={{ transformOrigin: "center" }}
              ></span>
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-1 text-[#3b5d3b] px-4 py-1.5 font-semibold text-xs sm:text-sm transition relative group"
            >
              Blog
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-0 h-[2px] bg-[#3b5d3b] transition-all duration-300 group-hover:w-[70%]"
                style={{ transformOrigin: "center" }}
              ></span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 text-[#3b5d3b] px-4 py-1.5 font-semibold text-xs sm:text-sm transition relative group"
            >
              Contact
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-0 h-[2px] bg-[#3b5d3b] transition-all duration-300 group-hover:w-[70%]"
                style={{ transformOrigin: "center" }}
              ></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Spacing between bars */}
      <div className="h-3 sm:h-4"></div>

      {/* Sub Bar: Welcome & Logout */}
      <div className="bg-[#f3f9f4] border border-[#d2e3c8] px-4 py-2 w-[94vw] mx-auto rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Welcome */}
        <div className="flex items-center gap-2">
          <img
            src={
              userData?.profileImageUrl ||
              "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
            }
            alt="Profile"
            className="w-15 h-15 rounded-full object-cover border-2 border-green-200"
            draggable={false}
          />
          <span className="flex flex-col text-[#6b705c] text-md">
            <span className="flex items-center gap-1">
              Welcome <span className="font-bold uppercase ml-1">{user}</span>
            </span>
            {userData?.email && (
              <span className="text-[11px] text-[#8a958a] font-normal mt-0.5">
                {userData.email}
              </span>
            )}
          </span>
        </div>
        {/* Right: Logout */}
        <div className="flex justify-end min-w-[100px]">
          <button
            className="flex items-center gap-1 bg-[#b7d7b0] hover:bg-[#a3cfa0] text-[#3b5d3b] cursor-pointer px-4 py-1.5 rounded font-semibold text-xs sm:text-sm transition"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        <div className="w-full flex justify-center">
          <div className="w-[94vw] max-w-4xl bg-white rounded-xl border border-[#e2dbc7] shadow-sm p-4 sm:p-8 mx-auto">
            {/* Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              <Link
                to="/"
                className="flex flex-col items-center justify-center rounded-lg shadow hover:shadow-md transition bg-[#e6f4ea] hover:bg-[#b7d7b0] text-[#3b5d3b] py-6 px-2 w-full"
              >
                <Home size={32} />
                <span className="text-xs font-semibold text-center mt-2">
                  Home
                </span>
              </Link>
              {dashboardTiles.map((tile) => (
                <Link
                  to={tile.to}
                  key={tile.label}
                  className="flex flex-col items-center justify-center rounded-lg shadow hover:shadow-md transition bg-[#e6f4ea] hover:bg-[#b7d7b0] text-[#3b5d3b] py-6 px-2 w-full"
                >
                  {tile.icon}
                  <span className="text-xs font-semibold text-center mt-2">
                    {tile.label}
                  </span>
                </Link>
              ))}
              {userData && userData.role === "HERBALIST" && (
                <Link
                  to="/my-plants"
                  className="flex flex-col items-center justify-center rounded-lg shadow hover:shadow-md transition bg-[#e6f4ea] hover:bg-[#b7d7b0] text-[#3b5d3b] py-6 px-2 w-full"
                >
                  <Sprout size={32} />
                  <span className="text-xs font-semibold text-center mt-2">
                    My Plants
                  </span>
                </Link>
              )}
            </div>

            {/* News Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#3b5d3b]">
                  Latest News
                </h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {newsdata?.results?.length > 0 ? (
                  newsdata.results.map((article, index) => (
                    <a
                      key={index}
                      href={article.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-[#e2dbc7] bg-[#f6f8ed] hover:shadow-md transition p-0 overflow-hidden group"
                    >
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={
                            article.image_url
                              ? article.image_url
                              : "https://mediaengagement.org/wp-content/uploads/2022/12/News-Desert-Web-Tile-1.png"
                          }
                          alt="News"
                          className="w-full md:w-32 h-40 md:h-32 object-cover bg-[#e6f4ea]"
                        />
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-[#3b5d3b] group-hover:text-[#6b705c] mb-1 text-base line-clamp-2">
                              {article.title}
                            </h4>
                            <p className="text-[#6b705c] text-sm mb-2 line-clamp-3">
                              {article.description}
                            </p>
                          </div>
                          <span className="text-[#7ca982] text-xs font-medium mt-2 group-hover:underline">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-[#b7b7a4] text-center col-span-2">
                    No news articles found.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* Responsive styles */}
      <style>{`
        body {
          background: #f6f8ed;
        }
        .min-h-screen { min-height: 100vh; }
        .max-w-4xl { max-width: 100%; }
        @media (min-width: 1024px) {
          main > .flex {
            justify-content: center;
          }
          .max-w-4xl {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
      <Footer/>
    </div>
  );
}
