import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  // Fetch user details to populate the form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user details.");
      }
    };
    fetchUserDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put("/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully.");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div
      className="flex justify-center items-center 
        bg-gray-100 h-screen"
    >
      <div className="p-6  mx-auto bg-white rounded shadow content-center w-1/2 ">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
