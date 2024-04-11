import React, { useEffect, useState } from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./Contact.css";

function Contact({ userData, donatorId }) {
  const [users, setUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);

  // Update the Contact component to fetch donors
  useEffect(() => {
    const fetchDonators = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:5321/api/donators", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const donatorData = await response.json();
          setUsers(donatorData);
        }
      } catch (error) {
        console.error("Error fetching donators:", error);
      }
    };

    fetchDonators();
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = window.localStorage.getItem('token');
  //       if (token) {
  //         const response = await fetch('http://localhost:5321/userData', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${token}`, // Include the token in the headers
  //           },
  //         });
  //         const responseData = await response.json();
  //         console.log('Response Data:', responseData);

  //         // Log the structure of responseData.userData
  //         console.log('User Data:', responseData.userData);

  //         // Filter out the logged-in user's data from the fetched user data
  //         const otherUsersData = responseData.userData.filter(user => user._id !== userData._id);

  //         // Update the state with other users' data
  //         setUsers(otherUsersData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userData]); // Add userData to dependency array to re-fetch data when user data changes

  // useEffect(() => {
  //   const fetchDonatorData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5321/api/users/${donatorId}`);
  //       const donatorData = await response.json();
  //       setCurrentChatUser(donatorData);
  //     } catch (error) {
  //       console.error('Error fetching donator data:', error);
  //     }
  //   };

  //   if (donatorId) {
  //     fetchDonatorData();
  //   }
  // }, [donatorId]);

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
        {/* Display donors as contacts */}
        <div className="usersDetailContainer">
          {users.map((user, index) => (
            <div
              key={index}
              className="userContainer"
              onClick={() => handleUser(user)}
            >
              {/* Display user information */}
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

      <ChatContainer currentChatUser={currentChatUser} currentUser={userData} />
    </div>
  );
}

export default Contact;
