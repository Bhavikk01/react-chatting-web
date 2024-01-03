import React, { useState } from "react";
import { IoMdSend } from 'react-icons/io';
import './chat_input.css';

const ChatInput = ({ onMsgSend }) => {

    const [msg, updateMsg] = useState("");

    const handleTextChange = (msg) => {
        updateMsg(msg);
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            await onMsgSend(msg);
            updateMsg("");
        }
    };

    return (
        <div className="message-input">
            <form className="input-container" onSubmit={(e) => sendMessage(e)}>
                <input
                    type="text"
                    value={msg}
                    placeholder="Type your message here"
                    name="message"
                    onChange={(e) => handleTextChange(e.target.value)} />

                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;