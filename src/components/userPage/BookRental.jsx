import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../assets/styles/UserPage.css'
import { useAuth } from '../auth/AuthProvider';
import UserRentedBooksDetails from './UserRentedBooksDetails';

export default function BookRental() {
  const booksDetailsAPI = import.meta.env.VITE_BOOKDETAILS;
  const userDetailsAPI = import.meta.env.VITE_USERDETAILS;
  const auth = useAuth();
  const data = auth.user;

  const [booksDetails, setBooksDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [filterdBooks, setFilterdBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
      const user = userDetailsResponse.data;
      setUserDetails(user);
      return user;
    } catch (error) {
      console.log("Error in fetching User details, Try again later");
    }
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
      const response = await fetchUserDetails(userDetails.id);
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
            "rentedDate": new Date().toLocaleDateString(),
            "rentedTime": new Date().toLocaleTimeString()
          }

          const updateRentedBook = {
            "booksRented": [...response.booksRented, newBookData],
          }
          await axios.patch(`${userDetailsAPI}/${userDetails.id}`, updateRentedBook);
          alert("Book Rented Successfully");
          updateBookStock(bookAllData.id, bookAllData.bookStock);
          fetchUserDetails(userDetails.id);
        } catch (error) {
          console.log("Error fetching book data : " + error);
        }
      }

    } catch (error) {
      console.log("Error renting book : " + error);
    }

  }

  const handleSearch = async () => {
    if (searchItem.trim() === "") {
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

        <div className='searchbar'>
          <input type='search' value={search} onChange={(event)=>setSearch(event.target.value)} placeholder='Search Book with Title' ></input>
          <button onClick={handleSearch}>Search</button>
        </div>

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
