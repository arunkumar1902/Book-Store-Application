import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ADMINEMAIL, ADMINPASSWORD, BOOKDETAILSAPI, USERDETAILSAPI } from '../../../public/config/env';

const AuthContext = createContext();
export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('site'));
        if (data) {
            loginAction(data);
        }
    }, []);
  
    const fetchBookData = async () => {
        try {
            const response = await axios.get(`${BOOKDETAILSAPI}`);
            setBookDetails(response.data);
        } catch (error) {
            console.log("Error in fetching books details, Try again later : ", error);
        }
    }
    
    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${USERDETAILSAPI}/${userId}`);
            setUser(response.data);
            return response.data;
        }
        catch (error) {
            console.log("Error fetching user data : ", error);
        }
    }

    const loginAction = async (data) => {
        try {
            await fetchUserData(data.id);
            localStorage.setItem("site", JSON.stringify(data));
            if (data.email === ADMINEMAIL && data.password === ADMINPASSWORD) {
                // alert("You are now logged in as Admin");
                navigate('/adminPage');
            } else {
                navigate('/bookRental');
            } 
        } catch (error) {
            console.log("Error Logging in : ", error);
        }
    }

    const logout = () => {
        setUser(null);
        // navigate('/loginPage');
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ user, fetchUserData, loginAction, logout, bookDetails, fetchBookData }}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => { //custom hook
    return useContext(AuthContext);
}