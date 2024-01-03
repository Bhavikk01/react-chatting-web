import React, { useState, useEffect } from "react";
import Logo from '../../../assets/logo.svg';
import Avatar from '../../../assets/avatar.png';

import './contacts.css';

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelection, setCurrentSelection] = useState(undefined);
    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = async (index, contact) => {
        setCurrentSelection(index);
        changeChat(contact);
    };
    return (
        <>{
            currentUserName && (
                <div className="contact-container">
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>Chatify</h3>
                    </div>
                    <div className="contact-list">{
                        contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelection ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={Avatar} alt="Avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>

                                </div>
                            );
                        })
                    }</div>

                </div>
            )
        }</>
    );
};

export default Contacts;