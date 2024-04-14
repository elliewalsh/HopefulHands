
import React, { useEffect, useState } from 'react';
import Contact from '../Contact';
import ChatContainer from '../../ChatContainer/ChatContainer';

function Chatbox(props) {
  const donatedByContact = props.location.state?.donatedByContact;
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const userResponse = await fetch(`http://localhost:5321/api/user`, {
          headers: {
            Authorization: token,
          },
        });
        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.error);
        }
        const userData = await userResponse.json();

        let chatUser = null;
        if (userData.email === donatedByContact) {
          // If the current user is the donator, fetch the user who sent the message
          const messagesResponse = await fetch(`http://localhost:5321/api/chat-messages/${userData._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!messagesResponse.ok) {
            const errorData = await messagesResponse.json();
            throw new Error(errorData.error);
          }
          const messagesData = await messagesResponse.json();
          if (messagesData.length > 0) {
            const senderId = messagesData[0].Sender;
            const senderResponse = await fetch(`http://localhost:5321/api/users/${senderId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!senderResponse.ok) {
              const errorData = await senderResponse.json();
              throw new Error(errorData.error);
            }
            const senderData = await senderResponse.json();
            chatUser = senderData;
          }
        } else {
          // If the current user is the sender, fetch the donator
          const donatorResponse = await fetch(`http://localhost:5321/api/products/byContact/${donatedByContact}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!donatorResponse.ok) {
            const errorData = await donatorResponse.json();
            throw new Error(errorData.error);
          }
          const donatorData = await donatorResponse.json();
          chatUser = donatorData;
        }

        setCurrentChatUser(chatUser);

        // Fetch messages for the current chat
        const messagesResponse = await fetch(`http://localhost:5321/api/chat-messages/${chatUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!messagesResponse.ok) {
          const errorData = await messagesResponse.json();
          throw new Error(errorData.error);
        }
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (donatedByContact) {
      fetchChatData();
    }
  }, [donatedByContact]);

  const handleUserSelect = (user) => {
    setCurrentChatUser(user);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Contact userData={props.userData} currentChatUser={currentChatUser} onUserSelect={handleUserSelect} />
      <ChatContainer currentChatUser={currentChatUser} currentUser={props.userData} messages={messages} />
    </div>
  );
}

export default Chatbox;
