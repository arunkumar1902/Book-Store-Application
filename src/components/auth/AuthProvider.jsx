import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default function AuthProvider({ children }) {
    const adminEmail = import.meta.env.VITE_ADMINEMAIL;
    const adminPassword = import.meta.env.VITE_ADMINPASSWORD;
    const booksDetailsAPI = import.meta.env.VITE_BOOKDETAILS;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [bookDetails, setBookDetails] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('site'));
        if (data) {
            loginAction(data);
            fetchBookData();
        }
    }, []);
  
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${booksDetailsAPI}`);
        setBookDetails(response.data);
      } catch (error) {
        console.log("Error in fetching books details, Try again later : ", error);
      }
    }

    const loginAction = (data) => {
        if (data) {
            setUser(data);
            localStorage.setItem("site", JSON.stringify(data));
            if (data.email === adminEmail && data.password === adminPassword) {
                navigate('/adminPage');
            } else {
                navigate('/bookRental', { state: { userId: data.id } });
            }
        }
    }

    const logout = () => {
        setUser(null);
        navigate('/loginPage');
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ user, loginAction, logout, bookDetails, fetchBookData}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => { //custom hook
    return useContext(AuthContext);
}