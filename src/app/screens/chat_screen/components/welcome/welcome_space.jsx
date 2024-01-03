import React from 'react';
import './welcome_space.css';
import Robot from '../../../../../assets/robot.gif';

const WelcomeSpace = ({ currentUser }) => {
    return (
        <div className='welcome-container'>
            <img src={Robot} alt="Robot" />
            <h1>Welcome, {currentUser.username}</h1>
            <span>Please select a chat to start Message</span>
        </div>
    );
}

export default WelcomeSpace;