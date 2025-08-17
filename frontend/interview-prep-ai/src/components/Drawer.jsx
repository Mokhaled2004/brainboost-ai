import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] w-full md:w-[40vw] 
        bg-white shadow-2xl shadow-cyan-800/10 border-l border-gray-200 
        transform transition-transform duration-300 ease-in-out 
        flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-100 flex-shrink-0">
        <h5
          id="drawer-right-label"
          className="text-base font-semibold text-gray-900"
        >
          {title}
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-8 h-8 flex items-center justify-center"
        >
          <LuX className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Drawer;
