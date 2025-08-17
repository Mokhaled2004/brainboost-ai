import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; // Import API paths for login
import { UserContext } from "../../context/userContext"; // Import UserContext for user state management

const Login = ({ setCurrentPage }) => {
  // State for form inputs
  const [email, setEmail] = useState(""); // Stores user email
  const [password, setPassword] = useState(""); // Stores user password
  const [error, setError] = useState(null); // Stores validation/API errors

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate(); // For redirecting after successful login

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    // --- Validation ---
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password."); // fixed typo
      return;
    }

    // Clear any previous error before new attempt
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data; // Extract token from response

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        updateUser(response.data); // Update user context with new user data
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (error) {
      // Display API-specific error if available
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold mb-2 text-center">Welcome Back</h3>
      <p className="text-xs text-slate-700 mb-6 text-center">
        Please enter your details to login
      </p>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="Email Address"
        />

        {/* Password Input */}
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          type="password"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="btn-primary">
          Login
        </button>

        {/* Link to Signup */}
        <p className="text-[13px] text-slate-800 mt-3 text-center">
          Don't have an account?{" "}
          <button
            type="button" // prevent form submission when clicking
            className="font-medium text-cyan-600 underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
