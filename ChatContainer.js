import React, { useEffect, useState } from "react";
import "./ChatContainer.css";

function ChatContainer({ userData, donatorId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [donatorData, setDonatorData] = useState(null);

  useEffect(() => {
    const fetchDonatorData = async () => {
      try {
        const response = await fetch(`http://localhost:5321/api/users/${donatorId}`);
        const data = await response.json();
        setDonatorData(data);
      } catch (error) {
        console.error('Error fetching donator data:', error);
      }
    };

    if (donatorId) {
      fetchDonatorData();
    }
  }, [donatorId]);

  const fetchMessageData = async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token || !donatorData || !userData) return;
      const response = await fetch(`http://localhost:5321/api/post/get/chat/msg/${userData._id}/${donatorData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setMessages(responseData);
      }
    } catch (error) {
      console.error('Error fetching message data:', error);
    }
  };

  useEffect(() => {
    if (donatorData && userData) {
      fetchMessageData();
    }
  }, [donatorData, userData]);

  const sendMessage = async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token || !donatorData || !userData || !message.trim()) return;
      const response = await fetch('http://localhost:5321/api/post/msg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: userData._id,
          to: donatorData._id,
          message: message.trim(),
        }),
      });
      if (response.ok) {
        setMessage('');
        fetchMessageData();
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="mainChatContainer">
      <div className="contactSection">
        {donatorData && (
          <div className="donatorContainer">
            <img src={donatorData.profilePicture} className="donatorProfilePicture" alt="" />
            <div>
              <p>{donatorData.fname} {donatorData.lname}</p>
              <p>Open your message</p>
            </div>
          </div>
        )}
      </div>
      <div className="chatSection">
        <div className="msgContainer">
          {messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.myself ? 'right' : 'left'}`}>
              <img
                src={msg.myself ? userData.profilePicture : donatorData?.profilePicture}
                className="chatuserProfile"
                alt=""
              />
              <p className="msgTxt">{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="msgSenderContainer">
          <input
            type="text"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="msgInput"
          />
          <button onClick={sendMessage} className="msg-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;