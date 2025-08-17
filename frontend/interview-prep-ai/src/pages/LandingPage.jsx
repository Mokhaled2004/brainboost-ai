import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Hero_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import LandingFooter from "../components/LandingFooter";
import FeatureCard from "../components/FeatureCard";
import { UserContext } from "../context/userContext"; // Import UserContext for user state management
import ProfileInfoCard from "../components/Cards/ProfileInfoCard"; // Import ProfileInfoCard component
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to toggle auth modal visibility
  const [openAuthModal, setOpenAuthModal] = useState(false);

  // State to track which form is currently active in the modal: "login" or "signup"
  const [currentPage, setCurrentPage] = useState("login");

  // Placeholder for future Call-To-Action logic
  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true); // Open the auth modal when CTA is clicked
    } else {
      navigate("/dashboard");
    }
  };

  // Framer Motion animation variants for FeatureCard
  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="w-full min-h-full bg-[#F9FAFB] relative">
        <div className="w-[500px] h-[500px] bg-cyan-200/20 blur-[85px] absolute top-0 left-0"></div>

        <div className="container mx-auto px-4 pt-6 pb-[70px] relative z-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-16 gap-4 sm:gap-0">
            {/* Logo */}
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-center sm:text-left xl:ml-20">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black">
                Brain
              </h1>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                Boost
              </h1>
              <span className="text-black font-bold text-lg -mb-3">AI</span>
            </div>

            {/* 🔗 Center Navigation */}
            <nav className="flex items-center justify-center gap-6 text-lg font-semibold">
              <button
                onClick={() => navigate("/")}
                className="relative text-cyan-600 after:content-[''] after:block after:w-full after:h-[2px] after:bg-cyan-600 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                Home
              </button>
              <a
                href="#features"
                className="text-gray-700 hover:text-cyan-600 transition-colors duration-300"
              >
                Features
              </a>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-cyan-600 transition-colors duration-300"
              >
                Dashboard
              </button>
            </nav>

            {/* Right side Auth/Profile */}
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="px-4 sm:px-6 py-2 bg-black text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-md self-center sm:self-auto xl:mr-20"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / SignUp
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-8 md:mb-0 text-center md:text-left xl:ml-20">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="flex items-center gap-2 text-[13px] text-cyan-700 font-semibold bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300 shadow-sm">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-cyan-600 font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-12 text-center md:text-left xl:mr-20">
              <p className="text-lg text-gray-700 font-semibold mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts and organise everything your way. From
                preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                onClick={handleCTA}
                className="px-6 py-3 bg-black text-white font-semibold rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full min-h-full relative z-10 mb-24">
        <section className="flex items-center justify-center mt-12 md:mt-16">
          <img
            src={Hero_IMG}
            alt="Hero Image"
            className="w-[90vw] sm:w-[80vw] rounded-lg shadow-lg"
          />
        </section>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Features That Make You Shine ✨
          </h2>

          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {APP_FEATURES.slice(0, 3).map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {APP_FEATURES.slice(3, 5).map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <LandingFooter />

      {/* AUTH MODAL */}
      <Modal
        isOpen={openAuthModal} // controlled by state
        onClose={() => {
          setOpenAuthModal(false); // close modal
          setCurrentPage("login"); // reset page to login
        }}
        hideHeader
      >
        <div>
          {/* Conditional rendering of login/signup */}
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
