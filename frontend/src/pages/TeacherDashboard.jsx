import React from "react";
import { useNavigate } from "react-router-dom";
import StudentList from "../components/Teacher/StudentList";
import AttendanceTable from "../components/Teacher/AttendanceTable";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // Redirect to the profile page
  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <p>
        Welcome to your dashboard. You can manage students and track their
        attendance here.
      </p>

      {/* View Profile Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleViewProfile}
      >
        View Profile
      </button>

      <hr className="my-6" />

      {/* Student List Section */}
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      <StudentList />

      <hr className="my-6" />

      {/* Attendance Tracking Section */}
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <AttendanceTable />
    </div>
  );
};

export default TeacherDashboard;
