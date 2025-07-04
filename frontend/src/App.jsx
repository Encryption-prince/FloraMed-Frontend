import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import dynamicRoutes from "./components/dynamicRoutes";
import { motion } from "framer-motion";
import Loader from "./components/Loader"; // Import the loader
import Navbar from "./components/Navbar";
import AuthCallback from "./components/AuthCallback";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Gardening from "./components/Gardening";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import HealthWellness from "./components/HealthWellness";
import CartPage from "./components/CartPage";
import BlogPage from "./components/BlogPage";
import MyHerbs from "./components/MyHerbs";
import AddPlant from "./components/AddPlant";
import HerbalistsMyPlants from "./components/HerbalistsMyPlants";
import Subscription from "./components/Subscription";
import DoctorsPage from "./components/DoctorsPage";
import Orders from "./components/Orders";
import Success from "./components/Success";
import Testimonials from "./components/Testimonials";
import MarketPlace from "./components/MarketPlace";
import HerbIdentifier from "./components/HerbIdentifier";
import Contact from "./components/Contact";
import HerbalTreatment from "./components/HerbalTreatment";
function App() {
  
  

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // <== Loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  

  if (loading) {
    return <Loader />; // 👈 Show loader while loading
  }

  return (
    <Router>
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Routes>
          
          <Route
            
            path="/"
            element={
              <>
                <div className="relative min-h-screen overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <motion.video
                      src="/videos/video2.mp4"
                      autoPlay
                      muted
                      loop
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Navbar and Hero Section */}
                  <div className="relative z-10">
                    <Navbar className="text-white" />
                    <Hero  />
                  </div>

                  {/* Grayish Overlay */}
                  {<div className="absolute inset-0 bg-gray-900/50 z-0"></div>}
                </div>

                {/* Cards Section */}
                
                  <CardsSection
                    
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                

                {/* Features Section */}
                <div  className="px-4 sm:px-6 lg:px-8">
                  <Features  />
                </div>

                <HerbIdentifier />

                <Subscription />
                <Testimonials />
                <Footer />
              </>
            }
          />

          {/* Other Routes */}
          
          <Route
            path="/marketplace"
            element={
              <MarketPlace cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gardening-tips" element={<Gardening />} />
          <Route path="/oauth/callback" element={<AuthCallback />} />
          <Route path="/blog" element={<BlogPage />} />
          
          <Route path="/add-plants" element={<AddPlant />} />
          <Route path="/my-plants" element={<HerbalistsMyPlants />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/payment-success" element={<Success />} />
          <Route
            path="/cart"
            element={
              <CartPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/myherbs" element={<MyHerbs />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/health"
            element={<HealthWellness />
            }
          />
          {dynamicRoutes.map(({ path, component }, index) => (
  <Route key={index} path={path} element={component} />
))}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
