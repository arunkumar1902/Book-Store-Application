import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider';
import UserRentedBooksDetails from './UserRentedBooksDetails';
import axios from 'axios';

export default function UserProfile() {
    const userDetailsAPI = import.meta.env.VITE_USERDETAILS;
    const auth = useAuth();
    const data = auth.user;
    const [userData, setUserData] = useState({});

    useEffect(()=>{
        fetchUser(data.id);
    },[]);
    
    const fetchUser = async (id)=> {
        try {
            const response = await axios.get(`${userDetailsAPI}/${id}`);
            const user = response.data;
            setUserData(user);
            return user;
        } catch (error) {
            console.log(error);       
        }
    }
    return (
        <div>
            <h4>Profile</h4>
            <div className='userProfile'>
                <i>Name : </i><p> {data.username}</p>
                <i>Email : </i><p>{data.email}</p>
            </div>

            <h4>Rented Books </h4>
            <UserRentedBooksDetails userData={userData} fetchUser={fetchUser}></UserRentedBooksDetails>
        </div>
    )
}
