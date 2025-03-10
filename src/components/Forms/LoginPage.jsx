import React from 'react'
import FormValidation from './FormValidation'
import '../../assets/styles/Forms.css'
import { Link } from 'react-router-dom'


function LoginPage({ data, handleChange, validation, error }) {

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(validation()){
            
            alert("Login Successful");
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
