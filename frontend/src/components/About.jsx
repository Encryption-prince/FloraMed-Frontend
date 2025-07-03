import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
  FaPython,
  FaDatabase,
  FaPenNib,
  FaFileAlt,
  FaBusinessTime,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
  SiAdobephotoshop,
  SiPostman,
  SiFramer,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import {
  SiSpringboot,
  SiPostgresql,
  SiSupabase,
  SiKoyeb,
  SiDocker,
  SiRazorpay,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import Footer from "./Footer";



import Subha from "../assets/team/subha.jpeg";

const teamMembers = [
  {
    name: "Areesh Zafar",
    role: "Frontend Developer",
    tech: [
      <FaReact title="React" className="text-cyan-500" />,
      <SiTailwindcss title="Tailwind CSS" className="text-sky-400" />,
      <SiJavascript title="JavaScript" className="text-yellow-400" />,
      <FaHtml5 title="HTML5" className="text-orange-500" />,
      <FaCss3Alt title="CSS3" className="text-blue-600" />,
      <SiFramer title="Framer Motion" className="text-violet-600" />,
      <FaGithub title="GitHub" className="text-black" />,
      <img
        src="https://assets.codepen.io/16327/internal/avatars/users/default.png?fit=crop&format=auto&height=256&version=1697554632&width=256"
        alt="GSAP"
        title="GSAP"
        className="w-8 h-8 rounded-full object-cover ring-2 ring-green-400 shadow-md"
      />,
    ],
  },
  {
    name: "Subham Maity",
    role: "Backend Developer",
    tech: [
      <DiJava title="Java" className="text-red-600" />,
      <SiSpringboot title="Spring Boot" className="text-green-700" />,
      <SiPostgresql title="PostgreSQL" className="text-blue-700" />,
      <SiSupabase title="Supabase" className="text-emerald-500" />,
      <SiKoyeb title="Koyeb" className="text-purple-500" />,
      <SiDocker title="Docker" className="text-blue-500" />,
      <FaGithub title="GitHub" className="text-black" />,
      <SiRazorpay title="Razorpay" className="text-blue-500" />,
    ],
  },
  {
    name: "Subha Deep Mishra",
    role: "Frontend & API Manager",
    tech: [
            <FaHtml5 title="HTML5" className="text-orange-500" />,
                  <FaCss3Alt title="CSS3" className="text-blue-600" />,
      <SiTailwindcss title="Tailwind CSS" className="text-sky-400" />,
      <SiJavascript title="JavaScript" className="text-yellow-400" />,

      <FaReact title="React" className="text-sky-500" />,

      <SiPostman title="Postman" className="text-orange-500" />,
      <FaNodeJs title="Node.js" className="text-green-600" />,
      <FaGithub title="GitHub" className="text-black" />,
    ],
  },
  {
    name: "Sruti Sarkar",
    role: "Presentation and Documentation",
    tech: [
      <FaFileAlt title="Documentation" className="text-blue-600" />,
      <FaFigma title="Figma" className="text-violet-600" />,
      <SiAdobephotoshop title="Photoshop" className="text-blue-800" />,
      <FaGithub title="GitHub" className="text-black" />,
    ],
  },
];

export default function About() {
  return (
    <>
      <Navbar className="" />
      <div className="min-h-screen bg-gradient-to-b mt-[12vh] from-white to-[#f6f8ed] py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#3b5d3b]">
          About Our Team
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-[0_0_20px_5px_rgba(34,197,94,0.2)]"
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={{
                rest: {},
                hover: {
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {/* Main static image */}
              <div className="relative mb-4">
                <motion.div
    className="relative w-20 h-20"
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {/* Original Image - disappears on hover */}
    <motion.img
      src={Subha}
      alt="Profile"
      className="w-full h-full rounded-full object-cover border-4 border-green-200 shadow absolute top-0 left-0 z-10"
      draggable={false}
      variants={{
        rest: { opacity: 1, scale: 1 },
        hover: { opacity: 0, scale: 0.8 },
      }}
      transition={{ duration: 0.3 }}
    />
                {/* Floating/enlarged image on hover */}
                <motion.img
                  src={Subha}
                  alt="Profile Floating"
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-400 shadow-lg absolute left-1/2 -translate-x-1/2 z-20"
                  style={{ top: 0 }}
                  initial={{ opacity: 0, y: 0, scale: 1 }}
                  variants={{
                    rest: { opacity: 0, y: 0, scale: 1 },
                    hover: { opacity: 1, y: -50, scale: 1.5 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  draggable={false}
                />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {member.name}
              </h2>
              <p className="text-green-700 font-semibold mb-4">{member.role}</p>
              <div className="flex flex-wrap justify-center gap-3 text-2xl text-gray-600 mt-2">
                {member.tech.map((icon, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.3 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}
