import React, { useEffect, useState } from 'react';
import Contact from '../Contact';
import ChatContainer from '../../ChatContainer/ChatContainer';

function Chatbox(props) {
  const donatedByContact = props.location.state?.donatedByContact;
  const [currentChatUser, setCurrentChatUser] = useState(null);

  useEffect(() => {
    const fetchDonatorData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`http://localhost:5321/api/products/byContact/${donatedByContact}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const donatorData = await response.json();
        setCurrentChatUser(donatorData);
        console.log("Donator Data:", donatorData);
      } catch (error) {
        console.error('Error fetching donator data:', error);
      }
    };

    if (donatedByContact) {
      fetchDonatorData();
    }
  }, [donatedByContact]);

  return (
    <div style={{ display: 'flex' }}>
      <Contact userData={props.userData} currentChatUser={currentChatUser} />
      <ChatContainer currentChatUser={currentChatUser} currentUser={props.userData} />
    </div>
  );
}

export default Chatbox;