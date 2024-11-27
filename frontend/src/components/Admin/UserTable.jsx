import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        // Include the token in the Authorization header
        const response = await api.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        alert("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleUserStatusChange = async (userId, isActive) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = isActive
        ? "/admin/restrict-user"
        : "/admin/reactivate-user";

      const response = await api.post(
        endpoint,
        { userId, isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // Update user state in the table
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: !isActive } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update user status.");
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Role</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.role}</td>
            <td className="border px-4 py-2  flex items-center justify-center">
              <button
                className={`px-2 py-1 rounded ${
                  user.isActive ? "bg-red-500" : "bg-green-500"
                } text-white`}
                onClick={() => handleUserStatusChange(user._id, user.isActive)}
              >
                {user.isActive ? "Restrict" : "Activate"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
