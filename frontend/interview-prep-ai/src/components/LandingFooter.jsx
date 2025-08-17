import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-white">Brain</span>
              <span className="text-blue-600">Boost</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your AI-powered toolkit to ace every interview. Practice, learn,
              and shine ✨
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Dr. M. All rights reserved.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              {["Features", "Pricing", "FAQs", "Docs"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {["Blog", "Guides", "Community", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-khaled-bayoumi/"
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-2xl"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          Made with ❤️ & ⚡ by Mohamed Khaled
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
