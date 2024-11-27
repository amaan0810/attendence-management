import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const AttendanceHistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/teacher/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch attendance history.");
      }
    };
    fetchHistory();
  }, []);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Time</th>
          <th className="border px-4 py-2">Selfie</th>
        </tr>
      </thead>
      <tbody>
        {history.map((record) => (
          <tr key={record._id}>
            <td className="border px-4 py-2">
              {new Date(record.timestamp).toLocaleDateString()}
            </td>
            <td className="border px-4 py-2">
              {new Date(record.timestamp).toLocaleTimeString()}
            </td>
            <td className="border px-4 py-2">
              <img src={record.selfieUrl} alt="Selfie" className="w-16 h-16" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceHistoryTable;
