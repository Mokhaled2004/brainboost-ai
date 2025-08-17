import React from "react";

/**
 * Modal Component
 * ----------------
 * A reusable popup container for displaying any custom content.
 * Controlled entirely by the parent via props.
 *
 * Props:
 * @param {ReactNode} children  - JSX content inside the modal
 * @param {boolean} isOpen      - Controls visibility of modal
 * @param {function} onClose    - Callback to close the modal
 * @param {string} title        - Optional modal header text
 * @param {boolean} hideHeader  - If true, hides the header section
 */
const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  // ❌ If modal is not open, return null so nothing is rendered.
  //    Improves performance & avoids unnecessary DOM updates.
  if (!isOpen) {
    return null;
  }

  return (
    // 🔲 Background overlay that covers the entire screen
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      {/* 📦 Modal content container */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 🏷 Header Section (Only shown if hideHeader is false) */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        {/* ❌ Close Button - Calls parent-provided onClose handler */}
        <button
          className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}
          aria-label="Close Modal"
        >
          {/* SVG Icon for X */}
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2 2l10 10M12 2L2 12"
            />
          </svg>
        </button>

        {/* 📜 Main Content Area - Flexible to hold any child components */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
