import React, { useEffect } from 'react'
import { useAuth } from '../../auth/AuthProvider';
import UserRentedBooksDetails from './UserRentedBooksDetails';
import '../../../assets/styles/Profile.css'
import UserReturnedBooks from './UserReturnedBooks';
import ProfileEdit from './ProfileEdit';
import { useLocation } from 'react-router-dom';

export default function UserProfile() {
    const auth = useAuth();
    const data = auth.user;

    const location = useLocation();
    const { profileData } = location.state;

    useEffect(() => {
        auth.fetchUserData(data.id);
    }, []);

    return (
        <div className='UserProfileContent'>
            {profileData === "profile" && <div><h2>My Details</h2> <ProfileEdit userData={data} ></ProfileEdit></div>}

            {profileData === "rentedBooks" && <div><h2>Currently Rented Books</h2><UserRentedBooksDetails userData={data}></UserRentedBooksDetails></div>}

            {profileData === "returnedBooks" && <div><h2>Returned Books Details</h2><UserReturnedBooks userData={data}></UserReturnedBooks></div>}
        </div>
    )
}
