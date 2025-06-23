import { useState } from 'react'
import '../../assets/styles/Forms.css'
import { EMAILPATTERN, USERDETAILSAPI } from '../../../public/config/env';
import axios from 'axios';
import NewPassword from '../newPassword/NewPassword';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const [passwordContainer, setPasswordContainer] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: ''
    });

    const [error, setError] = useState({
        emailError: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const validation = () => {
        let isValid = true;

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

        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validation()) {
            try {
                const response = await axios.get(`${USERDETAILSAPI}`);
                const userData = response.data;
                const isUserExist = userData.find((user) => user.email === data.email);

                if (isUserExist) {
                    alert("Create New Password");
                    setPasswordContainer(true);
                    setUserId(isUserExist.id);
                }
                else {
                    alert("Email not Exists, try another");
                }
            } catch (error) {
                alert("Error Occurred : ", error);
            }
        }
    }

    const handleCancel = ()=>{
        if(confirm("Do you want to cancel ? ")){
            navigate('/loginPage');
        }
    }

    return (
        <div className='maindiv'>
            {passwordContainer ?
                <NewPassword userID = {userId}></NewPassword>
                :
                <div className='formdiv'>
                    <h2>Forgot Password</h2><hr />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id='email' 
                                name='email' 
                                placeholder='Enter Your Email'
                                value={data.email} 
                                onChange={handleChange} 
                                required
                            />
                            <span>{error.emailError && <p>{error.emailError}</p>}</span>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
