import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import exclaim from "../assets/exclaim.svg";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [userData, setUserData] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState([]); // Track liked blogs

  const token = sessionStorage.getItem("token");

  // Fetch profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    if (token) fetchUserData();
  }, [token]);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/blogs/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(res.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    try {
      await axios.post(
        "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/blogs/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchBlogs();
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleLike = (id) => {
    if (likedBlogs.includes(id)) {
      // Unlike
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: (blog.likes || 1) - 1 } : blog
        )
      );
      setLikedBlogs(likedBlogs.filter((blogId) => blogId !== id));
    } else {
      // Like
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
        )
      );
      setLikedBlogs([...likedBlogs, id]);
    }
  };

  const handleComment = (id) => {
    if (commentText.trim() === "") return;
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...(blog.comments || []), commentText] }
          : blog
      )
    );
    setCommentText("");
    setActiveCommentBox(null);
  };

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
    <div className="bg-[#f6f8ed] min-h-screen">
      <Navbar />
      <div className="mt-[12vh] flex flex-col min-h-screen relative">
        {/* Dynamic Profile Card */}
        {userData && (
          <div className="absolute top-4 right-4 bg-[#f3f9f4] border border-[#d2e3c8] shadow rounded-full flex items-center p-2 z-10">
            <img
              src={
                userData.profileImageUrl ||
                "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
            />
            <div className="ml-2">
              <h2 className="text-sm font-bold text-[#3b5d3b]">
                {userData.name || "Floramed User"}
              </h2>
              <p className="text-xs text-[#6b705c]">
                {userData.role || "User"}
              </p>
            </div>
          </div>
        )}

        <div className="flex-grow p-6">
          <form
            onSubmit={handleSubmit}
            className="w-[93vw] mx-auto bg-[#e6f4ea] border border-[#d2e3c8] shadow rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-4 text-[#3b5d3b]">
              Start a post
            </h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 mb-4 border border-[#d2e3c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
              required
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="What do you want to talk about?"
              rows="4"
              className="w-full px-4 py-2 mb-4 border border-[#d2e3c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#7ca982] text-white cursor-pointer px-6 py-2 rounded-lg shadow hover:bg-[#3b5d3b] transition"
            >
              Post
            </button>
          </form>

          <div className="space-y-6 w-[93vw] mx-auto">
            {blogs.length === 0 ? (
              <p className="text-center text-[#6b705c]">
                No posts yet. Be the first to share something!
              </p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-[#f3f9f4] border border-[#d2e3c8] shadow rounded-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-[#3b5d3b] mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-[#6b705c] mb-4">{blog.content}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(blog.id)}
                      className={`font-semibold ${
                        likedBlogs.includes(blog.id)
                          ? "text-[#3b5d3b]"
                          : "text-[#7ca982] hover:text-[#3b5d3b]"
                      }`}
                    >
                      👍 {blog.likes || 0}{" "}
                      {likedBlogs.includes(blog.id) ? "Liked" : "Like"}
                    </button>
                    <button
                      onClick={() =>
                        setActiveCommentBox(
                          activeCommentBox === blog.id ? null : blog.id
                        )
                      }
                      className="text-[#3b5d3b] hover:text-[#7ca982] font-semibold"
                    >
                      💬 {blog.comments?.length || 0} Comments
                    </button>
                  </div>
                  {activeCommentBox === blog.id && (
                    <div className="mt-4">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        rows="2"
                        className="w-full px-4 py-2 mb-2 border border-[#d2e3c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b7d7b0] bg-white text-[#3b5d3b]"
                      ></textarea>
                      <button
                        onClick={() => handleComment(blog.id)}
                        className="bg-[#7ca982] text-white px-4 py-2 rounded-lg shadow hover:bg-[#3b5d3b] transition"
                      >
                        Post Comment
                      </button>
                    </div>
                  )}
                  {blog.comments && blog.comments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-[#3b5d3b]">
                        Comments:
                      </h3>
                      <ul className="list-disc list-inside text-[#6b705c]">
                        {blog.comments.map((comment, index) => (
                          <li key={index}>{comment}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
