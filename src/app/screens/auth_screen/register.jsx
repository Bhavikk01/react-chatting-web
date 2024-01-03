import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import './register.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerUser } from '../../utils/api_routes';

function RegisterScreen() {
    const navigate = useNavigate();
    const [formValues, setValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, email, confirmPassword } = formValues;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else if (password.length <= 8) {
            toast.error("Password should be greater than 8", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else {
            const { data } = await axios.post(registerUser, {
                username: username,
                email: email,
                password: password,
            });
            if (data.status) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                toast.error(data.msg, {
                    position: "bottom-right",
                    autoClose: 8000,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        }
    };

    const handleTextChange = (event) => {
        setValue({ ...formValues, [event.target.name]: event.target.value })
    };
    return (
        <>
            <div className='register-card'>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>Chatify</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={(e) => handleTextChange(e)}
                    />
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
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={(e) => handleTextChange(e)}
                    />
                    <button type='submit'>Create User</button>
                    <span>Already have an account? <Link to='/login'>Login</Link></span>

                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default RegisterScreen;
