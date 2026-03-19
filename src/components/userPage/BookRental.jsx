import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../assets/styles/UserPage.css'
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function BookRental() {
  const booksDetailsAPI = import.meta.env.VITE_BOOKDETAILS;
  const userDetailsAPI = import.meta.env.VITE_USERDETAILS;

  const [userId, setUserId] = useState();
  const [booksDetails, setBooksDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [profile, setProfile] = useState(false);
  const auth = useAuth();
  // const navigate = useNavigate();
  const [userRentBook, setUserRentBook] = useState(false);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [filterdBooks, setFilterdBooks] = useState([]);

  useEffect(() => {
    const data = auth.user;
    setUserId(data.id);
    fetchBookData();
    fetchUserDetails(data.id);
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${booksDetailsAPI}`);
      setBooksDetails(response.data);
      setFilterdBooks(response.data);
    } catch (error) {
      console.log("Error in fetching books details, Try again later");
    }
  }

  const fetchUserDetails = async (id) => {
    try {
      const userDetailsResponse = await axios.get(`${userDetailsAPI}/${id}`);
      const user = userDetailsResponse.data
      setUserDetails(user);
      setRentedBooks(user.booksRented)
      return user;
    } catch (error) {
      console.log("Error in fetching User details, Try again later");
    }
  }

  const handleProfile = () => {
    setProfile(!profile);
  }

  const updateBookStock = async (bookId, bookStock) => {
    try {
      await axios.patch(`${booksDetailsAPI}/${bookId}`, {
        "bookStock": bookStock - 1
      });
      fetchBookData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRent = async (bookAllData) => {
    try {
      const response = await fetchUserDetails(userId);
      const bookIdDetails = response.booksRented.map((book) => (book.bookId));
      const checkAlreadyRentedBook = bookIdDetails.some((rentedBookId) => (rentedBookId === bookAllData.id));

      if (checkAlreadyRentedBook) {
        alert("Book Already Rented");
      }
      else {
        try {
          const newBookData = {
            "bookId": bookAllData.id,
            "bookAuthor": bookAllData.bookAuthor,
            "bookTitle": bookAllData.bookTitle,
          }

          const updateRentedBook = {
            "booksRented": [...response.booksRented, newBookData],
          }
          await axios.patch(`${userDetailsAPI}/${userId}`, updateRentedBook);
          alert("Book Rented Successfully");
          updateBookStock(bookAllData.id, bookAllData.bookStock);

          setRentedBooks([
            ...response.booksRented,
            newBookData
          ]);

        } catch (error) {
          console.log("Error fetching book data : " + error);
        }
      }

    } catch (error) {
      console.log("Error renting book : " + error);
    }

  }

  const handleUserRentedBook = () => {
    setUserRentBook(!userRentBook);
  }

  const handleSearch = async (event) => {
    const search = event.target.value;
    if (search.trim() === "") {
      setBooksDetails(filterdBooks);
    }
    else {
      const searchTerms = Array.from(search.toLowerCase());
      const books = filterdBooks.filter((bookdata) => {
        const BookTitle = bookdata.bookTitle.toLowerCase();
        return searchTerms.every((term) => (BookTitle.includes(term)));
      });
      setBooksDetails(books);

    }
  }

  return (

    <div className="userpage">
      <div className='userButtons'>

        <input type='search' onChange={handleSearch} placeholder='Search Book with Title' ></input>

        <button onClick={handleProfile}>Profile</button>
        {profile && <div className='userProfile'>
          <i>Name : </i><p> {userDetails.username}</p>
          <i>Email : </i><p>{userDetails.email}</p>
          <button onClick={() => (auth.logout())}>Logout</button>
        </div>}

        <button onClick={handleUserRentedBook}>My Rental Books</button>
        {userRentBook && <div className='userRentBook'>
          {rentedBooks.map((BooksRented, index) => (
            <div key={index}>
              <p><i>S.No :</i> {index + 1}</p>
              <i>Book Name : </i><p> {BooksRented.bookTitle}</p>
              <i>Author : </i><p>{BooksRented.bookAuthor}</p>
              <hr />
            </div>
          ))}
        </div>}

      </div>

      <div className='bookpage'>
        {
          booksDetails.length == 0 ?
            <h2>No results found</h2> :

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
                      <button disabled={book.bookStock <= 0} onClick={() => { handleRent(book) }}>Rent Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        }
      </div>
    </div>

  )
}
