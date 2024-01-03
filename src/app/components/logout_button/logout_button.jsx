import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icons from 'react-icons';
import './logout_button.css';
import { BiPowerOff } from 'react-icons/bi';
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <button>
            <BiPowerOff onClick={handleClick} />
        </button>
    );
}

export default Logout;