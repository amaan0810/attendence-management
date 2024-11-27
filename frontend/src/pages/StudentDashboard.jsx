import React from "react";
import { useNavigate } from "react-router-dom";
import MarkAttendance from "../components/Student/MarkAttendance";
import AttendanceHistoryTable from "../components/Student/AttendanceHistoryTable";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Redirect to the profile page
  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p>
        Welcome to your dashboard. You can mark attendance and view your
        attendance history here.
      </p>

      {/* View Profile Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleViewProfile}
      >
        View Profile
      </button>

      <hr className="my-6" />

      {/* Mark Attendance Section */}
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <MarkAttendance />

      <hr className="my-6" />

      {/* Attendance History Section */}
      <h2 className="text-2xl font-bold mb-4">Attendance History</h2>
      <AttendanceHistoryTable />
    </div>
  );
};

export default StudentDashboard;
