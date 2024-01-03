import React, { useState, useEffect, useRef } from 'react';
import './chat_screen.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from '../../components/contacts/contacts';
import ChatSpace from './components/chat_space/chat_space.jsx';
import WelcomeSpace from './components/welcome/welcome_space.jsx';
import { getAllUser, host } from '../../utils/api_routes';
import { io } from 'socket.io-client';

const ChatScreen = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllUsers = async () => {
        const { data } = await axios.get(`${getAllUser}/${currentUser._id}`);
        setContacts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);

        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            fetchAllUsers();
        }
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <div className='chat-container'>
            <div className="contacts">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contacts>
                {
                    currentChat === undefined && !isLoading
                        ? <WelcomeSpace currentUser={currentUser} />
                        : <ChatSpace currentChat={currentChat} currentUser={currentUser} socket={socket} />
                }
            </div>
        </div>
    );
}

export default ChatScreen;
