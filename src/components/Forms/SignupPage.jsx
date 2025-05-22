import React, { useState } from 'react'
import '../../assets/styles/Forms.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EMAILPATTERN, PASSWORDPATTERN, USERDETAILSAPI, USERNAMEPATTERN } from '../../config/env';


export default function SignupPage() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState({
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmpasswordError: ''
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validation = () => {
        let isValid = true;

        //username validation

        if (!USERNAMEPATTERN.test(data.username)) {
            setError((prevError) => ({
                ...prevError,
                usernameError: 'Enter name with only alphabets'
            }));
            isValid = false;
        } else {
            setError((prevError) => ({
                ...prevError,
                usernameError: ''
            }));
        }


        //email validation
        if (!EMAILPATTERN.test(data.email)) {
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
        if (data.password === "" || !PASSWORDPATTERN.test(data.password)) {
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

        //confirm password validation

        if (data.confirmpassword === "" || data.confirmpassword !== data.password) {
            setError((prevError) => ({
                ...prevError,
                confirmpasswordError: "Password does not match"
            }));
            isValid = false;
        } else {
            setError((prevError) => ({
                ...prevError,
                confirmpasswordError: ''
            }));
        }


        return isValid;

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation()) {
            try {
                const response = await axios.get(`${USERDETAILSAPI}`);
                const existingUser = response.data;
                const IsUserExist = existingUser.some((user) => (user.email === data.email));
                if (IsUserExist) {
                    alert('User already Exist, try again');
                }
                else {
                    const updatedData = { ...data, cartDetails:[], booksRented: [], returnedBooks: []  }
                    await axios.post(`${USERDETAILSAPI}`, updatedData);
                    alert('Account Created Successfully, Login now');
                    navigate('/loginPage');
                }
            } catch (error) {
                alert('Error Occurred : ' + error);
            }
        }
    }
    return (

        <div className='maindiv'>
            <div className='formdiv'>
                <h2>Create Account</h2><hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Name</label>
                        <input type="text" id='username' name='username' value={data.username} onChange={handleChange} />
                        <span>{error.usernameError && <p>{error.usernameError}</p>}</span>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={data.email} onChange={handleChange} />
                        <span>{error.emailError && <p>{error.emailError}</p>}</span>
                    </div>

                    <div>
                        <label htmlFor="password">Create a Password</label>
                        <input type="password" id='password' name='password' value={data.password} onChange={handleChange} />
                        <span>{error.passwordError && <p>{error.passwordError}</p>}</span>
                    </div>

                    <div>
                        <label htmlFor="confirmpassword">Re-Enter Your Password</label>
                        <input type="password" id='confirmpassword' name='confirmpassword' value={data.confirmpassword} onChange={handleChange} />
                        <span>{error.confirmpasswordError && <p>{error.confirmpasswordError}</p>}</span>
                    </div>

                    <div>
                        <button type='submit'>Submit</button>
                    </div>

                    <div>
                        Already have an account? <Link to='/loginPage'>Login</Link>
                    </div>

                </form>
            </div>
        </div>

    )
}
