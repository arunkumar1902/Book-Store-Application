import React, { useEffect, useState } from 'react'
import { useAuth } from './auth/AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css'

export default function Header() {
    const auth = useAuth();
    const data = auth.user;
    const navigate = useNavigate();


    const [searchItem, setSearchItem] = useState("");

    const handleProfile = () => {
        navigate('/userProfile')
    }
    
    const handleSearch = ()=>{
        if(searchItem.trim() === ""){
            console.log("No search data");
        }
        else{
            navigate('/searchProduct', {state:{ searchItem:searchItem}})
        }
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

                    <div className='search'>
                        <input 
                            type='search' 
                            value={searchItem} 
                            placeholder='Search Book with Title' 
                            onChange={(event)=>setSearchItem(event.target.value)}
                        ></input>
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div className='profile'>
                        <Link to='/userProfile'>Profile</Link>
                        <button onClick={() => (auth.logout())}>Logout</button>
                    </div>

                </div>}
            </header>
        </div>
    )
}
