import React from "react";
import "./Contact.css";

function Contact({ userData, currentChatUser }) {
  console.log("Current Chat User:", currentChatUser);

  const getProfilePictureUrl = (profilePicture) => {
    if (profilePicture) {
      return `http://localhost:5321/uploads/${profilePicture}`;
    }
    return "";
  };

  return (
    <div className="mainContactContainer">
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input
            type="search"
            placeholder="Search for Donator"
            className="searchbarforcontact"
          />
        </div>
        <div className="usersDetailContainer">
          {currentChatUser ? (
            <div className="userContainer">
              {/* Render profile picture */}
              {currentChatUser.profilePicture && (
                <img
                  src={getProfilePictureUrl(currentChatUser.profilePicture)}
                  alt={`${currentChatUser.fname} ${currentChatUser.lname}'s profile picture`}
                  className="chatuserimage"
                />
              )}
              <div style={{ marginLeft: "10px" }}>
                <p
                  style={{
                    color: "black",
                    textAlign: "center",
                    marginTop: "5px",
                    fontSize: "15px",
                  }}
                >
                  {currentChatUser.fname} {currentChatUser.lname}
                </p>
              </div>
            </div>
          ) : (
            <p>No donator selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;