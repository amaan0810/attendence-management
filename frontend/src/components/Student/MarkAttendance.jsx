import React, { useState } from "react";
import Webcam from "react-webcam";
import api from "../../utils/api";

const MarkAttendance = () => {
  const [selfie, setSelfie] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(imageSrc);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/student/mark-attendance",
        { selfieUrl: selfie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button
        onClick={capture}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Capture Selfie
      </button>
      {selfie && (
        <div>
          <img src={selfie} alt="Selfie" className="mt-4 border" />
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
