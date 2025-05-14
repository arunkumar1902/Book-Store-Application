import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/AuthProvider';
import UserRentedBooksDetails from './UserRentedBooksDetails';
import '../../../assets/styles/Profile.css'
import UserReturnedBooks from './UserReturnedBooks';
import { Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';

export default function UserProfile() {
    const auth = useAuth();
    const data = auth.user;

    const [profile, setProfile] = useState(true);
    const [rentedBooks, setRentedBooks] = useState(false);
    const [returnedBooks, setReturnedBooks] = useState(false);

    useEffect(() => {
        auth.fetchUserData(data.id);
    }, []);

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
                    {data.email !== "admin@gmail.com" &&
                        <>
                            <span onClick={handleRentedBooks}>Rented Books</span>&emsp;
                            <span onClick={handleReturnedBooks}>Returned Books</span>
                        </>
                    }
                </div>
                <div className='UserProfileContent'>
                    {profile && <div><h4>My Details : <br /><br /></h4> <ProfileEdit userData={data} ></ProfileEdit></div>}

                    {rentedBooks && <div><h4>Currently Rented Books : <br /><br /></h4><UserRentedBooksDetails userData={data}></UserRentedBooksDetails></div>}

                    {returnedBooks && <div><h4>Returned Books Details : </h4><UserReturnedBooks userData={data}></UserReturnedBooks></div>}
                </div>
            </div>
        </div>
    )
}
