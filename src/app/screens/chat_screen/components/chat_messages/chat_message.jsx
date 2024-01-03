import React, { useState, useEffect, useRef } from 'react';
import './chat_message.css';
import axios from 'axios';
import { getMessages } from '../../../../utils/api_routes';

const ChatMessages = ({ messages }) => {

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    return (
        <div>{
            messages.map((element) => {
                return (
                    <div className="message-container" ref={scrollRef}>
                        <div className={`message ${element.fromSelf ? 'sent' : 'received'}`}>
                            <div className="content">
                                <p>{element.message}</p>
                            </div>
                        </div>
                    </div>
                );
            })
        }</div>
    );
};

export default ChatMessages;