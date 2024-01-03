import React, { useEffect, useState } from 'react';
import './chat_space.css';
import Avatar from '../../../../../assets/avatar.png';
import Logout from '../../../../components/logout_button/logout_button.jsx';
import ChatInput from '../chat_input/chat_input.jsx';
import ChatMessages from '../chat_messages/chat_message.jsx';
import axios from 'axios';
import { sendMessage, getMessages } from '../../../../utils/api_routes.js';
const ChatSpace = ({ currentChat, currentUser, socket }) => {

    const [messages, updateMessages] = useState([]);
    const [arrivalMessage, setArrival] = useState(null);

    const getAllMessages = async () => {
        if (currentUser) {
            const { data } = await axios.post(getMessages, {
                from: currentUser._id,
                to: currentChat._id
            });
            updateMessages(data);
        }
    };

    useEffect(() => {
        getAllMessages();
    }, [currentChat]);

    const handleSendMessage = async (msg) => {
        await axios.post(sendMessage, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        });

        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        updateMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrival({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && updateMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    return (
        <> {currentChat && (
            <div className='chat-space-container'>
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            <img src={Avatar} alt="Avatar" />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                <div className="chat-messages">
                    <ChatMessages messages={messages} />
                </div>
                <div className="chat-input">
                    <ChatInput onMsgSend={handleSendMessage} />
                </div>
            </div>
        )}
        </>
    );
}

export default ChatSpace;