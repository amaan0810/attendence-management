import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import UserTable from "../components/Admin/UserTable";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <UserTable />
      </main>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
