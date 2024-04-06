import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePicture.css";

const ProfilePicture = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5321/api/users/${userData._id}/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload(); // Refresh the page after successful upload
    } catch (err) {
      setError("Failed to upload profile picture. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-picture-container">
      <div className="profile-picture">
        {userData.profilePicture ? (
          <img src={`http://localhost:5321/uploads/${userData.profilePicture}`} alt="Profile Picture" />
        ) : (
          <div className="placeholder">No Profile Picture</div>
        )}
        <div className="upload-overlay">
          <label htmlFor="profile-picture-input" className="upload-label">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="profile-picture-input"
          />
        </div>
      </div>
      {loading && <p>Uploading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePicture;