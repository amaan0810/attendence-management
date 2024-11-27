import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Attendance Management System
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage student attendance efficiently with easy-to-use dashboards for
          admins, teachers, and students.
        </p>

        <div className="space-x-4">
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            New to the system? You can{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleRegister}
            >
              create an account
            </span>{" "}
            to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
