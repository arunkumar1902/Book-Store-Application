import axios from 'axios';
import React, { useState } from 'react'

export default function ProfileEdit({ userData, fetchUser }) {
    const USERDETAILSAPI = import.meta.env.VITE_USERDETAILS;
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
        const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORDPATTERN);
        let isValid = true;

        if (!passwordPattern.test(updatedPassword.password)) {
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
                fetchUser(userData.id);
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

                <div>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="editingNewPassword">New Password : </label>
                            <input type="password" id='editingNewPassword' name='password' value={updatedPassword.password} onChange={handleUpdatedPassword} required />
                            {error.passwordError && <p>{error.passwordError}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password : </label>
                            <input type="password" id='confirmPassword' name='confirmPassword' value={updatedPassword.confirmPassword} onChange={handleUpdatedPassword} required />
                            {error.confirmPasswordError && <p>{error.confirmPasswordError}</p>}
                        </div>

                        <button type='submit'>Submit</button>

                    </form>
                    
                    <button onClick={handleCancel}>Cancel</button>
                </div>

                :<div>

                    {changePassword ? 

                        <button onClick={() => setChangePassword(false)}>Change Password</button>

                        :<div>
                            <form onSubmit={handleCurrentPasswordSubmit}>

                                <div>
                                    <label htmlFor="currentPassword">Current Password : </label>
                                    <input 
                                        type="password" 
                                        id='currentPassword' 
                                        value={currentPassword} 
                                        onChange={(event) => setCurrentPassword(event.target.value)} 
                                        required 
                                    />
                                </div>

                                <button type='submit'>Submit</button>

                            </form>

                            <button onClick={handleCancel}>Cancel</button>

                        </div>
                    }

                </div>
            }

        </div>
    )
}
