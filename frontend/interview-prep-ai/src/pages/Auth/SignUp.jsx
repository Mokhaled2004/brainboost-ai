import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// ✅ Upload image helper
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE, // "/api/auth/upload-image"
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // ⚡ Use imageURL because backend returns uppercase U
    return response.data; // { imageURL: "http://localhost:5000/uploads/..." }
  } catch (err) {
    console.error("Error uploading image:", err.response?.data || err.message);
    throw err;
  }
};

function SignUp({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // --- Validation ---
      if (!fullName.trim()) throw new Error("Please enter your full name.");
      if (!validateEmail(email)) throw new Error("Please enter a valid email.");
      if (!password) throw new Error("Please enter your password.");

      // --- 1️⃣ Upload profile pic if exists ---
      let profileImageUrl = "";
      if (profilePic) {
        const uploadRes = await uploadImage(profilePic);
        profileImageUrl = uploadRes.imageURL || ""; // ⚡ match backend
      }

      // --- 2️⃣ Register user ---
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const {
        token,
        _id,
        name,
        email: userEmail,
        profileImageUrl: imgUrl,
      } = res.data;

      // --- 3️⃣ Store token and update context ---
      if (token) {
        localStorage.setItem("token", token);
        updateUser({
          _id,
          name,
          email: userEmail,
          profileImageUrl: imgUrl,
          token,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error(err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-white rounded-2xl shadow-xl text-black mx-auto">
      <h3 className="text-2xl font-semibold mb-2 text-center">
        Create an Account
      </h3>
      <p className="text-xs text-slate-700 mb-6 text-center">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full bg-black text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-[13px] text-slate-800 mt-3 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-cyan-600 underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
