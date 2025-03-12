import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../assets/styles/UserPage.css'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function BookRental() {
  const location = useLocation();
  const { userId } = location.state;
  const [booksDetails, setBooksDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [profile, setProfile] = useState(false);
  const auth =useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/BooksDetails');
      setBooksDetails(response.data);
    } catch (error) {
      console.log("Error in fetching books details, Try again later");
    }
  }

  const fetchUserDetails = async () => {
    try {
      const userDetailsResponse = await axios.get(`http://localhost:3000/user/${userId}`);
      const user = userDetailsResponse.data
      setUserDetails(user);
    } catch (error) {
      console.log("Error in fetching User details, Try again later");
    }
  }

  useEffect(() => {
    fetchData();
    fetchUserDetails();
  }, []);

  const handleProfile = () => {
    setProfile(!profile);
  }
  const handleRent = () => {

  }
  return (
    <>
      <div className="userpage">

        <div className='userButtons'>
          <button onClick={handleProfile}>Profile</button>
          {profile && <div className='userProfile'>
            <i>Name : </i><p> {userDetails.username}</p>
            <i>Email : </i><p>{userDetails.email}</p>
            <button onClick={()=>(auth.logout())}>Logout</button>
          </div>}
          <button>My Rental Books</button>
        </div>

        <div>
          <h2>Books For Rent : </h2>

          <div className='userBookList'>
            {booksDetails.map((book) => (
              <div key={book.id} className='userBookContainer'>
                <div className='userBookImage'>
                  <img src={book.bookImage} alt={book.bookTitle} />
                </div>
                <div className='userBookDetails'>
                  <h4>{book.bookTitle}</h4>
                  <div>
                    <i>Author : {book.bookAuthor}</i><br />
                    <i>Available Stock : {book.bookStock}</i>
                  </div>
                  <button onClick={handleRent}>Rent Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
