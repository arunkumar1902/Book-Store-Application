import React, { useState } from 'react'
import { PASSWORDPATTERN, USERDETAILSAPI } from '../../../public/config/env';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPassword({userID}) {

    const navigate = useNavigate();

    const [updatedPassword, setUpdatedPassword] = useState({
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState({
        passwordError: '',
        confirmpasswordError: ''
    });

    const handleUpdatedPassword = (event) => {
        const { name, value } = event.target;
        setUpdatedPassword((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validation = () => {
        let isValid = true;

        //password validation
        if (!PASSWORDPATTERN.test(updatedPassword.password)) {
            setError((prev) => ({
                ...prev,
                passwordError: "Password must contain atleast 1 Special Character, 1 number, 1 uppercase and 1 lowercase alphabet with atleast 7 characters"
            }));
            isValid = false;
        }
        else {
            setError((prev) => ({
                ...prev,
                passwordError: ''
            }));
        }

        //confirm password validation
        if (updatedPassword.password !== updatedPassword.confirmpassword) {
            setError((prev) => ({
                ...prev,
                confirmpasswordError: "Password doesn't match"
            }));
            isValid = false;
        }
        else {
            setError((prev) => ({
                ...prev,
                confirmpasswordError: ''
            }));
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation()) {
            await axios.patch(`${USERDETAILSAPI}/${userID}`, updatedPassword );
            alert('Password Changed, Now  Login');
            navigate('/loginPage');
        }
    }

    return (
        <div className='formdiv'>
            <h3>NewPassword</h3>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="editingNewPassword">New Password : </label>
                    <input
                        type="password"
                        id='editingNewPassword'
                        name='password'
                        placeholder='Create a new Password'
                        value={updatedPassword.password}
                        onChange={handleUpdatedPassword}
                        required
                    />
                    {error.passwordError && <p>{error.passwordError}</p>}
                </div>

                <div>
                    <label htmlFor="confirmpassword">Confirm Password : </label>
                    <input
                        type="password"
                        id='confirmpassword'
                        name='confirmpassword'
                        placeholder='Re-Enter New Password'
                        value={updatedPassword.confirmpassword}
                        onChange={handleUpdatedPassword}
                        required
                    />
                    {error.confirmpasswordError && <p>{error.confirmpasswordError}</p>}
                </div>

                <button type='submit'>Submit</button>

            </form>

        </div>
    )
}
