import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Debugging: Log user object whenever it changes
  useEffect(() => {
    console.log("Current user object:", user);
  }, [user]);

  const handleLogOut = () => {
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user?.profileImageUrl || "/default-profile.png"} // fallback image
          alt={user?.name || "Profile"}
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user?.name || ""}
          </div>
          <button
            className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
