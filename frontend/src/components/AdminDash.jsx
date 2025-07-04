import React, { useEffect, useState } from "react";
import {
  LogOut,
  Home,
  Sprout,
  BookOpen,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- Add this import
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const adminTiles = [
  { label: "Home", icon: <Home size={32} />, to: "/" },
  { label: "My Herbs", icon: <Sprout size={32} />, to: "/myherbs" },
  { label: "Add Plant", icon: <PlusCircle size={32} />, to: "/add-plants" },
  { label: "Add Product", icon: <BookOpen size={32} />, to: "/add-products" },
  { label: "Remove Plant", icon: <Trash2 size={32} />, to: "/remove-plants" },
  {
    label: "Remove Product",
    icon: <Trash2 size={32} />,
    to: "/remove-products",
  },
];
const metricsData = [
  { name: "Users", value: 15000 },
  { name: "Products", value: 50000 },
  { name: "Orders", value: 44566 },
  { name: "Revenue", value: 30709 },
  { name: "Plants", value: 75869 },
];

function AdminDash() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- Add this line

  const [activeTab, setActiveTab] = useState("Metrics");

  const [herbalists, setHerbalists] = useState([
    {
      id: 1,
      name: "Ravi Sharma",
      email: "ravi@example.com",
      documentUrl: "https://example.com/docs/ravi",
    },
    {
      id: 2,
      name: "Nikita Mehra",
      email: "nikita@example.com",
      documentUrl: "https://example.com/docs/nikita",
    },
  ]);

  const [bannedHerbalists, setBannedHerbalists] = useState([]);
  const handleBanHerbalist = (id) => {
    const herbalistToBan = herbalists.find((h) => h.id === id);
    if (herbalistToBan) {
      setHerbalists((prev) => prev.filter((h) => h.id !== id));
      setBannedHerbalists((prev) => [...prev, herbalistToBan]);
    }
  };
  const handleUnbanHerbalist = (id) => {
    const herbalistToUnban = bannedHerbalists.find((h) => h.id === id);
    if (herbalistToUnban) {
      setBannedHerbalists((prev) => prev.filter((h) => h.id !== id));
      setHerbalists((prev) => [...prev, herbalistToUnban]);
    }
  };
  // Users and Banned Users state
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Amit Verma",
      email: "amit@example.com",
    },
    {
      id: 2,
      name: "Priya Sinha",
      email: "priya@example.com",
    },
  ]);

  const [bannedUsers, setBannedUsers] = useState([]);

  // Ban a user
  const handleBanUser = (id) => {
    const userToBan = users.find((u) => u.id === id);
    if (userToBan) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setBannedUsers((prev) => [...prev, userToBan]);
    }
  };

  // Unban a user
  const handleUnbanUser = (id) => {
    const userToUnban = bannedUsers.find((u) => u.id === id);
    if (userToUnban) {
      setBannedUsers((prev) => prev.filter((u) => u.id !== id));
      setUsers((prev) => [...prev, userToUnban]);
    }
  };

  // Fetch user data (same as Dashboard.jsx)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setUserData(null);
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
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setUserData(null);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Logout function (same as Dashboard.jsx)
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f8ed]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-white to-[#f6f8ed] min-h-screen p-4 space-y-6">
      {/* Top Bar (Dashboard style) */}
      <div className="bg-[#f3f9f4] border border-[#d2e3c8] px-4 py-2 w-[97vw] mx-auto rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Welcome */}
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-[#5c4032] flex items-center justify-center text-2xl font-bold text-white border-2 border-green-200 select-none">
            {userData?.name ? userData.name[0]?.toUpperCase() : "U"}
          </div>
          <span className="flex flex-col text-[#6b705c] text-md">
            <span className="flex items-center gap-1">
              Welcome{" "}
              <span className="font-bold uppercase ml-1">
                {userData?.name || "USER"}
              </span>
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
            className="flex items-center gap-1 bg-[#b7d7b0] hover:bg-[#a3cfa0] text-[#3b5d3b] px-4 py-1.5 rounded font-semibold text-xs sm:text-sm transition"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Tiles Section (Dashboard style) */}
      <div className="w-full flex justify-center">
        <div className="w-[97vw]  bg-white rounded-xl border border-[#e2dbc7] shadow-sm p-4 sm:p-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
            {adminTiles.slice(0, 6).map((tile, idx) => (
              <div
                key={tile.label + idx}
                className="flex flex-col items-center justify-center rounded-lg shadow hover:shadow-md transition bg-[#e6f4ea] hover:bg-[#b7d7b0] text-[#3b5d3b] py-6 px-2 w-full cursor-pointer"
                onClick={() => navigate(tile.to)} // <-- Add this line
              >
                {tile.icon}
                <span className="text-xs font-semibold text-center mt-2">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around border rounded-md py-2 bg-white text-sm font-medium text-[#3b5d3b]">
        {[
          "Metrics",
          "Herbalists",
          "Banned Herbalists",
          "Users",
          "Banned Users",
        ].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-2 py-1 rounded-sm ${
              activeTab === tab
                ? "bg-[#d2e3c8] font-bold text-green-800"
                : "hover:bg-[#f0f4ed]"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="bg-[#e6f4ea] p-6 rounded text-[#3b5d3b] min-h-[200px]">
        {activeTab === "Metrics" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">📊 Platform Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={metricsData}
                margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "Herbalists" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">🌿 Herbalists</h2>
            <div className="space-y-4">
              {herbalists.map((herbalist) => (
                <div
                  key={herbalist.id}
                  className="flex justify-between items-center bg-[#e6f4ea] p-4 rounded shadow-sm"
                >
                  {/* Left: Name and Email */}
                  <div>
                    <div className="font-semibold text-[#3b5d3b]">
                      {herbalist.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {herbalist.email}
                    </div>
                  </div>

                  {/* Center: Document Link */}
                  <div>
                    <a
                      href={herbalist.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline text-sm"
                    >
                      Document
                    </a>
                  </div>

                  {/* Right: Ban Button */}
                  <button
                    onClick={() => handleBanHerbalist(herbalist.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Ban
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Banned Herbalists" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">🚫 Banned Herbalists</h2>
            {bannedHerbalists.length === 0 ? (
              <p className="text-sm text-gray-600">No banned herbalists yet.</p>
            ) : (
              <div className="space-y-4">
                {bannedHerbalists.map((herbalist) => (
                  <div
                    key={herbalist.id}
                    className="flex justify-between items-center bg-[#fde2e4] p-4 rounded shadow-sm"
                  >
                    {/* Left: Name and Email */}
                    <div>
                      <div className="font-semibold text-[#3b5d3b]">
                        {herbalist.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {herbalist.email}
                      </div>
                    </div>

                    {/* Center: Document Link */}
                    <div>
                      <a
                        href={herbalist.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline text-sm"
                      >
                        Document
                      </a>
                    </div>

                    {/* Right: Unban Button */}
                    <button
                      onClick={() => handleUnbanHerbalist(herbalist.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm"
                    >
                      Unban
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Users" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">👥 Users</h2>
            {users.length === 0 ? (
              <p className="text-sm text-gray-600">No users available.</p>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-[#e6f4ea] p-4 rounded shadow-sm"
                  >
                    {/* Left: Name + Email */}
                    <div>
                      <div className="font-semibold text-[#3b5d3b]">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>

                    {/* Right: Ban Button */}
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                    >
                      Ban
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Banned Users" && (
          <div>
            <h2 className="font-semibold text-lg mb-4">🚫 Banned Users</h2>
            {bannedUsers.length === 0 ? (
              <p className="text-sm text-gray-600">No banned users yet.</p>
            ) : (
              <div className="space-y-4">
                {bannedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-[#fde2e4] p-4 rounded shadow-sm"
                  >
                    {/* Left: Name + Email */}
                    <div>
                      <div className="font-semibold text-[#3b5d3b]">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>

                    {/* Right: Unban Button */}
                    <button
                      onClick={() => handleUnbanUser(user.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm"
                    >
                      Unban
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;
