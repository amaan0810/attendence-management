import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const AttendanceHistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/teacher/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch attendance history.");
      }
    };
    fetchHistory();
  }, []);

  return (
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {history.map((record) => (
          <tr key={record._id}>
            <td className="border px-4 py-2">{record.name}</td>
            <td className="border px-4 py-2">{record.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceHistoryTable;
