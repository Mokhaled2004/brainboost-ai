import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; // Wait for context to settle

  return (
    <div>
      <Navbar />
      {user ? <div>{children}</div> : <div>Please log in</div>}
    </div>
  );
};

export default DashboardLayout;
