import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider';
import UserRentedBooksDetails from './UserRentedBooksDetails';
import axios from 'axios';
import '../../assets/styles/Profile.css'
import UserReturnedBooks from './UserReturnedBooks';
import { Link } from 'react-router-dom';

export default function UserProfile() {
    const userDetailsAPI = import.meta.env.VITE_USERDETAILS;
    const auth = useAuth();
    const data = auth.user;
    const [userData, setUserData] = useState({});

    const [profile, setProfile] = useState(true);
    const [rentedBooks, setRentedBooks] = useState(false);
    const [returnedBooks, setReturnedBooks] = useState(false);

    useEffect(() => {
        fetchUser(data.id);
    }, []);

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`${userDetailsAPI}/${id}`);
            const user = response.data;
            setUserData(user);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfile = () => {
        setProfile(true);
        setRentedBooks(false);
        setReturnedBooks(false);
    }

    const handleRentedBooks = () => {
        setProfile(false);
        setRentedBooks(true);
        setReturnedBooks(false);
    }

    const handleReturnedBooks = () => {
        setProfile(false);
        setRentedBooks(false);
        setReturnedBooks(true);
    }

    return (
        <div className='User'>
            <div className='back'>
                {data.email === 'admin@gmail.com' ? 
                <Link to='/adminPage'>Back</Link>
                : <Link to='/bookRental'>Back</Link>
            }
            </div>

            <div className='UserDiv'>
                <div className='div'>
                    <span onClick={handleProfile}>Profile</span> &emsp;
                    {data.email != "admin@gmail.com" &&
                        <>
                            <span onClick={handleRentedBooks}>Rented Books</span>&emsp;
                            <span onClick={handleReturnedBooks}>Returned Books</span>
                        </>
                    }
                </div>
                <div className='UserProfileContent'>
                    {profile && <div className='userProfile'>
                        <p>Name :  {data.username}</p><br />
                        <p>Email : {data.email}</p>
                    </div>}

                    {rentedBooks && <div><p>Currently Rented Books : <br /><br /></p><UserRentedBooksDetails userData={userData} fetchUser={fetchUser}></UserRentedBooksDetails></div>}

                    {returnedBooks && <div><p>Returned Books Details : </p><UserReturnedBooks userData={userData}></UserReturnedBooks></div>}
                </div>
            </div>
        </div>
    )
}
