import React from 'react'
import FormValidation from './FormValidation'
import '../../assets/styles/Forms.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function LoginPage({ data, handleChange, validation, error }) {
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {

        event.preventDefault();
        if (validation()) {
            try {
                const dbResponse = await axios.get('http://localhost:3000/user');
                const existingData = dbResponse.data;
                // find the email and password is exist in db
                const userExistance = existingData.find((user) => (user.email === data.email && user.password === data.password));

                console.log(userExistance);
                //checking user logged i as admin
                if (data.email === "admin@gmail.com" && data.password === "Admin@123") {
                    alert('Logined as admin');
                    navigate('/adminPage')
                }
                // for user login
                else if (userExistance) {
                    alert('Login successful');
                    navigate('/bookRental');
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
        <>
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
        </>
    )
}

export default FormValidation(LoginPage)
