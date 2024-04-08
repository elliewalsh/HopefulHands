import React, { useEffect, useState } from "react";
import './ChatContainer.css';

function ChatContainer({ currentChatUser, currentUser }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchMessageData = async () => {
        try {
            const token = window.localStorage.getItem('token');
            if (!token || !currentChatUser) return;

            const response = await fetch(`http://localhost:5321/api/post/get/chat/msg/${currentChatUser._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = await response.json();
            console.log('Response Data:', responseData);
            if (Array.isArray(responseData)) {
                setMessages(responseData);
            }
        } catch (error) {
            console.error('Error fetching message data:', error);
        }
    };

    useEffect(() => {
        fetchMessageData();
    }, [currentChatUser]);

    const sendMessage = async () => {
        
        try {
            const token = window.localStorage.getItem('token');
            if (!token || !currentChatUser || !message.trim()) return;

            const response = await fetch('http://localhost:5321/api/post/msg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from: currentUser._id,
                    to: currentChatUser._id,
                    message: message.trim(),
                }),
            });

            if (response.ok) {
                setMessage('');
                fetchMessageData(); // Use the locally defined fetchMessageData
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className ='mainChatContainer'>
            <div>
                <div className='msgContainer'>
                    {messages.map((msg, index) => (
                        <div key={index} className='msg'>
                            <img src='./images/img-7.jpg' className='chatuserProfile' alt=''/>
                            <p className='msgTxt'>{msg.message}</p>
                        </div>
                    ))}
                </div>
                <div className='msgSenderContainer'>
                    <input
                        type='text'
                        placeholder='Write your message here'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='msgInput'
                    />
                    <button onClick={sendMessage} className='msg-btn'>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatContainer;
