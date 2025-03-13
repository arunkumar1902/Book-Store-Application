import React from 'react'
import FormValidation from './FormValidation'
import '../../assets/styles/Forms.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignupPage({ data, handleChange, validation, error }) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation()) {
            try {
                const response = await axios.get("http://localhost:3000/user");
                const existingUser = response.data;
                const IsUserExist = existingUser.some((user)=>(user.email === data.email));
                if(IsUserExist){
                    alert('User already Exist, try again');
                }
                else{
                    const updatedData = {...data,booksRented:[]}
                    await axios.post("http://localhost:3000/user", updatedData)
                    .then((response) => {
                        console.log(response.data);
                        alert('Account Created Successfully, Login now');
                        navigate('/loginPage');
                        
                    }).catch((error)=>{
                        alert('Error Occurred : ' + error);
                    });
                }
            } catch (error) {
                alert('Error Occurred : ' + error);
            }
        }
    }
    return (
        <>
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
        </>
    )
}

export default FormValidation(SignupPage);