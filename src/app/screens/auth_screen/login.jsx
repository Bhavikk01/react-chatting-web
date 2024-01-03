import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';

import './login.css';
import axios from 'axios';
import { login } from '../../utils/api_routes';
import { toast, ToastContainer } from 'react-toastify';

function LoginScreen() {

    const navigate = useNavigate();
    const [formValues, setvalues] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting");
        const { email, password } = formValues;
        const { data } = await axios.post(login, {
            email: email,
            password: password
        });
        console.log(data.status);
        if (data.status) {
            toast.success("You are logged in successfully", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } else {
            console.log(data.msg);
            toast.error(data.msg, {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    const handleTextChange = (event) => {
        setvalues({ ...formValues, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className='login-card'>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>Chatify</h1>
                    </div>
                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleTextChange(e)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={(e) => handleTextChange(e)}
                    />
                    <button type='submit'>LOGIN</button>
                    <span>Don't have any account? <Link to='/register'>Create one</Link></span>

                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default LoginScreen;
