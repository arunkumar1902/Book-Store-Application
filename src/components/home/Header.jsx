import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/Header.css'
import { ADMINEMAIL } from '../../../public/config/env';

export default function Header() {
    const auth = useAuth();
    const data = auth.user;
    const navigate = useNavigate();

    const [searchItem, setSearchItem] = useState("");

    const handleSearch = () => {
        if (searchItem.trim() === "") {
            console.log("No search data");
        }
        else {
            navigate('/searchProduct', { state: { searchItem: searchItem } });
        }
    }

    const handleProfile = (data)=>{
        navigate('/userProfile', { state: { profileData: data } });
    }

    return (
        <div>
            <header className='header'>
                <h2>Book&nbsp;Store</h2>

                {data && <div className='navigation' >

                    <div className='details'>
                        {data.email === ADMINEMAIL ?
                            <Link to="/adminPage">Home</Link>
                            :
                            <Link to="/bookRental">Home</Link>
                        }
                        <a href='#about'>About</a>
                        <a href='#contact'>Contact</a>
                    </div>

                    <div className='headerContainer'>
                        <div className='search'>
                            <input
                                type='search'
                                value={searchItem}
                                placeholder='Search Book with Title'
                                onChange={(event) => setSearchItem(event.target.value)}
                            ></input>
                            <button onClick={handleSearch}>Search</button>
                        </div>

                        {data.email === ADMINEMAIL ?
                            <div className='profile'>
                                {/* <span>AdminPage</span> */}
                                <button onClick={() => (auth.logout())}>Logout</button>
                            </div>
                            :
                            <div className='profile'>
                                <Link to='/userCart'>
                                    <i className='fa fa-shopping-cart'>
                                        <span style={{ color: 'red' }}>({data.cartDetails.length})</span>
                                    </i>
                                </Link>
                                <div className='profileContainer'>
                                    <i className='fa fa-user' style={{cursor:'pointer'}}></i>
                                    <div className='profileDropdown'>
                                        <button onClick={()=>handleProfile("profile")}>Profile</button><br /><br />
                                        <button onClick={()=>handleProfile("rentedBooks")}>Rented Books</button><br /><br />
                                        <button onClick={()=>handleProfile("returnedBooks")}>Returned Books</button><br /><br />
                                        <button onClick={() => (auth.logout())}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>}
            </header>
        </div>
    )
}
