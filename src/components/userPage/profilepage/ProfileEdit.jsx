import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { PASSWORDPATTERN, USERDETAILSAPI } from '../../../../public/config/env';
import NewPassword from '../../newPassword/NewPassword';

export default function ProfileEdit({ userData}) {
    const auth = useAuth();
    const [changePassword, setChangePassword] = useState(true);
    const [editingNewPassword, setEditingNewPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        passwordError: '',
        confirmPasswordError: ''
    });

    const handleCurrentPasswordSubmit = (event) => {
        event.preventDefault();
        if (userData.password === currentPassword) {
            setEditingNewPassword(true);
            setCurrentPassword('')
        } else {
            alert("Wrong Password, try again");
        }
    }

    const handleUpdatedPassword = (event) => {
        const { name, value } = event.target;
        setUpdatedPassword((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCancel = () => {
        if (confirm("Do you want Cancel ?")) {
            setEditingNewPassword(false);
            setChangePassword(true);
            setCurrentPassword('');
            setUpdatedPassword({
                password: '',
                confirmPassword: ''
            });
        }
    }

    const validation = () => {
        let isValid = true;

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
        if (updatedPassword.password !== updatedPassword.confirmPassword) {
            setError((prev) => ({
                ...prev,
                confirmPasswordError: "Password doesn't match"
            }));
            isValid = false;
        }
        else {
            setError((prev) => ({
                ...prev,
                confirmPasswordError: ''
            }));
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation()) {
            try{
                await axios.patch(`${USERDETAILSAPI}/${userData.id}`, {
                    password : updatedPassword.password,
                    confirmpassword: updatedPassword.confirmPassword
                });
                alert('Updated Successfully');
                setEditingNewPassword(false);
                setChangePassword(true);
                setUpdatedPassword({
                    password: '',
                    confirmPassword: ''
                });
                auth.fetchUserData(userData.id);
            }
            catch(error){
                alert("Error occurred, try again: ", error);
            }
        }
    }

    return (
        <div className='userProfile'>
            <p>Name : {userData.username}</p><br />
            <p>Email : {userData.email}</p><br />

            {editingNewPassword ?

                <div className='PasswordDiv'>

                    <form onSubmit={handleSubmit} className='passwordContainer'>
                        <h3>New Password</h3>
                        <hr /><br />

                        <div>
                            <label htmlFor="editingNewPassword">New Password : </label>
                            <input type="password" id='editingNewPassword' name='password' value={updatedPassword.password} onChange={handleUpdatedPassword} required />
                            {error.passwordError && <p>{error.passwordError}</p>}
                        </div><br />

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password : </label>
                            <input type="password" id='confirmPassword' name='confirmPassword' value={updatedPassword.confirmPassword} onChange={handleUpdatedPassword} required />
                            {error.confirmPasswordError && <p>{error.confirmPasswordError}</p>}
                        </div><br />

                        <div className='buttonContainer'>
                            <button type='submit'>Submit</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>

                    </form>

                </div>

                :<div>

                    {changePassword ? 

                        <button onClick={() => setChangePassword(false)}>Change Password</button>

                        : <div className='PasswordDiv'>
                            <form onSubmit={handleCurrentPasswordSubmit} className='passwordContainer'>
                                <h3>Current Password</h3> <hr /><br />
                                <div>
                                    <label htmlFor="currentPassword">Password : </label>
                                    <input
                                        type="password"
                                        id='currentPassword'
                                        value={currentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value)}
                                        required
                                    />
                                </div><br />
                                <Link to='/forgotPassword'>Forgot Password?</Link><br />

                                <div className='buttonContainer'>
                                    <button type='submit'>Submit</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>


                        </div>
                    }

                </div>
            }

        </div>
    )
}
