import React from "react";
import "./Contact.css";

function Contact({ userData, currentChatUser, onUserSelect }) {
  return (
    <div className="mainContactContainer">
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input type="search" placeholder="Search for Donator" className="searchbarforcontact" />
        </div>
        <div className="usersDetailContainer">
          {currentChatUser && (
            <div className="userContainer" onClick={() => onUserSelect(currentChatUser)}>
              <img
                src={`http://localhost:5321/uploads/${currentChatUser.profilePicture}`}
                alt={`${currentChatUser.fname} ${currentChatUser.lname}'s profile picture`}
                className="chatuserimage"
              />
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;