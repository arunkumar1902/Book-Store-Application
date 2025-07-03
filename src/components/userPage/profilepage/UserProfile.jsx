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
            {profileData === "profile" && <div><h4>My Details : <br /><br /></h4> <ProfileEdit userData={data} ></ProfileEdit></div>}

            {profileData === "rentedBooks" && <div><h4>Currently Rented Books : <br /><br /></h4><UserRentedBooksDetails userData={data}></UserRentedBooksDetails></div>}

            {profileData === "returnedBooks" && <div><h4>Returned Books Details : </h4><UserReturnedBooks userData={data}></UserReturnedBooks></div>}
        </div>
    )
}
