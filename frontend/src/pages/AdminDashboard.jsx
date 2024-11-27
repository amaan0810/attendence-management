import UserTable from "../components/Admin/UserTable"; // Component for listing users
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="m-10 ">
      <div className="flex flex-col m-10 ">
        <div className="flex ">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        </div>

        <p>Welcome to the Admin dashboard. You can manage users here.</p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-60"
          onClick={handleViewProfile}
        >
          View Profile
        </button>
      </div>

      <UserTable />
    </div>
  );
};

export default AdminDashboard;
