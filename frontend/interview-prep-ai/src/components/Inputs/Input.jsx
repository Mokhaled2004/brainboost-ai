import { useState } from "react"; // Hook for local component state
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password toggle

/**
 * Reusable Input component
 * Props:
 * - value: Controlled value from parent
 * - onChange: Callback when user types
 * - label: Optional label text
 * - placeholder: Placeholder for the input
 * - type: Input type (e.g., "text", "email", "password")
 */
const Input = ({ value, onChange, label, placeholder, type }) => {
  // Local state for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col mb-4 w-full">
      {/* Render label only if provided */}
      {label && (
        <label className="mb-1 text-sm font-semibold text-black">{label}</label>
      )}

      <div className="relative w-full">
        {/* Main input field */}
        <input
          // Dynamically set input type based on password visibility
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value} // Controlled input value
          onChange={onChange} // Callback for changes
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Password toggle button (only for password inputs) */}
        {type === "password" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)} // Toggle state
          >
            {/* Change icon based on visibility */}
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
