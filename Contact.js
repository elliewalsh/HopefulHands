import React, { useEffect, useState } from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./Contact.css";

function Contact() {
  const [users, setUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5321/userData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
          });
          const responseData = await response.json();
          console.log('Response Data:', responseData);
          if (Array.isArray(responseData.userData)) {
            setUsers(prevUsers => [...prevUsers, ...responseData.userData]);
          } else {
            setUsers(prevUsers => [...prevUsers, responseData.userData]);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUser = (user) => {
    setCurrentChatUser(user);
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
          {users.map((user, index) => (
            <div key={index} className="userContainer" onClick={() => handleUser(user)}>
              <img src="./images/img-7.jpg" className="chatuserimage" alt="" />
              <div style={{ marginLeft: "10px" }}>
                <p
                  style={{
                    color: "black",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "15px",
                  }}
                >
                  {user.fname} {user.lname}
                </p>
                <p
                  style={{
                    color: "black",
                    textAlign: "start",
                    marginTop: "8px",
                    fontSize: "14px",
                  }}
                >
                  Open your message
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatContainer currentChatUser={currentChatUser} />
    </div>
  );
}

export default Contact;
