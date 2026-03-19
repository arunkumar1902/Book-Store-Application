import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default function AuthProvider({ children }) {
    const adminEmail = import.meta.env.VITE_ADMINEMAIL;
    const adminPassword = import.meta.env.VITE_ADMINPASSWORD;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('site'));
        if (data) {
            loginAction(data);
        }
    }, []);

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
        <AuthContext.Provider value={{ user, loginAction, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { //custom hook
    return useContext(AuthContext);
}