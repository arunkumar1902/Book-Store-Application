import React, { useEffect, useState } from 'react'
import '../../assets/styles/Forms.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'


export default function LoginPage() {
    const userDetailsAPI = import.meta.env.VITE_USERDETAILS;
    const adminEmail = import.meta.env.VITE_ADMINEMAIL;

    const auth = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        emailError: '',
        passwordError: ''
    });

    useEffect(()=>{
        const data = auth.user;
        if(data){
            console.log(data.username);
            if(data.email === adminEmail){
                navigate('/adminPage');
            }
            else{
                navigate('/bookRental');
            }
        }
    },[]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validation = () => {
        const emailPattern = new RegExp(import.meta.env.VITE_EMAILPATTERN);
        const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORDPATTERN);
        let isValid = true;

        //email validation
        if (!emailPattern.test(data.email)) {
            setError((prevError) => ({
                ...prevError,
                emailError: 'Enter valid Email ID'
            }));
            isValid = false;
        } else {
            setError((prevError) => ({
                ...prevError,
                emailError: ''
            }));
        }

        //password validation
        if (data.password === "" || !passwordPattern.test(data.password)) {
            setError((prevError) => ({
                ...prevError,
                passwordError: "Password must contain atleast 1 Special Character, 1 number, 1 uppercase and 1 lowercase alphabet with atleast 7 characters"
            }));
            isValid = false;
        } else {
            setError((prevError) => ({
                ...prevError,
                passwordError: ''
            }));
        }

        return isValid;

    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (validation()) {
            try {
                const dbResponse = await axios.get(`${userDetailsAPI}`);
                const existingData = dbResponse.data;
                // find the email and password is exist in db
                const userExistance = existingData.find((user) => (user.email === data.email && user.password === data.password));

                if (userExistance) {
                    alert('Login successful');
                    auth.loginAction(userExistance);
                }
                else {
                    alert('Email or password incorrect');
                }


            } catch (error) {
                alert("Error Occurred : " + error);
            }
        }
    }
    return (
        <div className='maindiv'>
            <div className='formdiv'>
                <h2>Login</h2><hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={data.email} onChange={handleChange} />
                        <span>{error.emailError && <p>{error.emailError}</p>}</span>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' value={data.password} onChange={handleChange} />
                        <span>{error.passwordError && <p>{error.passwordError}</p>}</span>
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>

                    <div>
                        New User? <Link to='/signupPage'>Signup</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

