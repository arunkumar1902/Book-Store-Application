import React from 'react'
import FormValidation from './FormValidation'
import '../../assets/styles/Forms.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'


function LoginPage({ data, handleChange, validation, error }) {
    const auth = useAuth();
    const handleSubmit = async (event) => {

        event.preventDefault();
        if (validation()) {
            try {
                const dbResponse = await axios.get('http://localhost:3000/user');
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
