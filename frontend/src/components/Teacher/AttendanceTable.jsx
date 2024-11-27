import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch attendance records for students
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/teacher/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendance(response.data); // Store the fetched attendance data
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch attendance records.");
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading attendance records...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Student Name</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Selfie</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id} className="border-b">
              <td className="px-4 py-2">{record.userId.name}</td>
              <td className="px-4 py-2">
                {new Date(record.timestamp).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(record.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-2">
                {record.selfieUrl ? (
                  <img
                    src={record.selfieUrl}
                    alt="Selfie"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <span>No selfie</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
