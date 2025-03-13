import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../assets/styles/UserPage.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function BookRental() {
  const [userId, setUserId] = useState();
  const [booksDetails, setBooksDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [profile, setProfile] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [userRentBook, setUserRentBook] = useState(false);
  const [rentedBooks, setRentedBooks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('site'));
    if (data) {
      setUserId(data.id);
      fetchBookData();
      fetchUserDetails(data.id);
      fetchUserRentedBooks();
    } else {
      navigate('/loginPage');
    }
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/BooksDetails');
      setBooksDetails(response.data);
    } catch (error) {
      console.log("Error in fetching books details, Try again later");
    }
  }

  const fetchUserDetails = async (id) => {
    try {
      const userDetailsResponse = await axios.get(`http://localhost:3000/user/${id}`);
      const user = userDetailsResponse.data
      setUserDetails(user);
    } catch (error) {
      console.log("Error in fetching User details, Try again later");
    }
  }

  const fetchUserRentedBooks =()=>{

  }

  const handleProfile = () => {
    setProfile(!profile);
  }

  const rentBook = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      const updateRentedBook = {
        "booksRented": [...response.data.booksRented,{"bookId":id}],
      }

      await axios.patch(`http://localhost:3000/user/${userId}`, updateRentedBook);
      alert("Book Rented Successfully");
    } catch (error) {
      console.log("Error fetching book data : " + error);
    }
  }


  const handleRent = async(bookId, bookStock) => {
    rentBook(bookId);

    try {
      await axios.patch(`http://localhost:3000/BooksDetails/${bookId}`,{
        "bookStock" : bookStock-1
      });      
    } catch (error) {
      console.log(error);
    }
    fetchBookData();
  }
  const handleUserRentedBook = ()=>{
    setUserRentBook(!userRentBook);
  }

  return (
    <>
      <div className="userpage">

        <div className='userButtons'>

          <button onClick={handleProfile}>Profile</button>
          {profile && <div className='userProfile'>
            <i>Name : </i><p> {userDetails.username}</p>
            <i>Email : </i><p>{userDetails.email}</p>
            <button onClick={() => (auth.logout())}>Logout</button>
          </div>}

          <button onClick={handleUserRentedBook}>My Rental Books</button>
          {userRentBook && <div className='userRentBook'>
            <i>Book Name : </i><p> {}</p>
            <i>Author : </i><p>{}</p>
          </div>}

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
                  <button disabled={book.bookStock<=0} onClick={() => { handleRent(book.id, book.bookStock) }}>Rent Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
