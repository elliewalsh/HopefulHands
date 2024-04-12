import React, { useEffect, useState, useRef } from "react";
import "./ChatContainer.css";

function ChatContainer({ currentChatUser, currentUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const fetchMessageData = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token || !currentChatUser || !currentUser) return;

      const response = await fetch(
        `http://localhost:5321/api/post/get/chat/msg/${currentUser._id}/${currentChatUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setMessages(responseData);
      }
    } catch (error) {
      console.error("Error fetching message data:", error);
    }
  };

  useEffect(() => {
    if (currentChatUser && currentUser) {
      fetchMessageData();
    }
  }, [currentChatUser, currentUser]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token || !currentChatUser || !currentUser || !message.trim()) return;

      const response = await fetch("http://localhost:5321/api/post/msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: currentUser._id,
          to: currentChatUser._id,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      setMessage("");
      fetchMessageData();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getProfilePictureUrl = (profilePicture) => {
    if (profilePicture) {
      return `http://localhost:5321/uploads/${profilePicture}`;
    }
    return "";
  };

  return (
    <div className="mainChatContainer">
      <div className="contactSection">
        {currentChatUser && (
          <div className="donatorContainer">
            <img
              src={getProfilePictureUrl(currentChatUser.profilePicture)}
              className="donatorProfilePicture"
              alt={`${currentChatUser.fname} ${currentChatUser.lname}'s profile picture`}
            />
            <div>
              <p>
                {currentChatUser.fname} {currentChatUser.lname} 
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="chatSection">
      <div id="chat-container" className="msgContainer">
  {messages.map((msg, index) => (
    <div key={index} className={`msg ${msg.myself ? "right" : "left"}`}>
      <img
        src={
          msg.myself
            ? getProfilePictureUrl(currentUser.profilePicture)
            : getProfilePictureUrl(currentChatUser?.profilePicture)
        }
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
 