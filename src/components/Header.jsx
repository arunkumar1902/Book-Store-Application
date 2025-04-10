import React, { useEffect, useState } from 'react'
import { useAuth } from './auth/AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css'

export default function Header() {
    const auth = useAuth();
    const data = auth.user;
    const navigate = useNavigate();

    const bookDetailsAPI = import.meta.env.VITE_BOOKDETAILS;

    const [books, setBooks] = useState({});

    useEffect(() => {
        if (data) {
            fetchBookDetails();
        }
    }, []);

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`${bookDetailsAPI}`);
            const booksData = response.data;
            setBooks(booksData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfile = () => {
        navigate('/userProfile')
    }

    return (
        <div>
            <header className='header'>
                <h1>Book Store</h1>

                {data && <div className='navigation'>

                    <div className='details'>
                        <h4>About</h4>
                        <h4>Contact</h4>
                    </div>

                    {/* <input type='search' placeholder='Search Book with Title' ></input> */}

                    <div className='profile'>
                        <button onClick={handleProfile}>Profile</button>
                        <button onClick={() => (auth.logout())}>Logout</button>
                    </div>

                </div>}
            </header>
        </div>
    )
}
