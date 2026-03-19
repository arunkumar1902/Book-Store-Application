import React from 'react'
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookDetails({ booksDetails }) {
  const auth = useAuth();
  const data = auth.user;
  const navigate = useNavigate();

  const USER_DETAILS = import.meta.env.VITE_USERDETAILS;
  const BOOK_DETAILS = import.meta.env.VITE_BOOKDETAILS;

  const handleRent = async (bookAllData) => {
    try {
      const response = await axios.get(`${USER_DETAILS}/${data.id}`);
      const bookIdDetails = response.data.booksRented.map((book) => (book.bookId));
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
            "booksRented": [...response.data.booksRented, newBookData],
          }
          await axios.patch(`${USER_DETAILS}/${data.id}`, updateRentedBook);
          alert("Book Rented Successfully");
          updateBookStock(bookAllData.id, bookAllData.bookStock);
        } catch (error) {
          console.log("Error fetching book data : " + error);
        }
      }

    } catch (error) {
      console.log("Error renting book : " + error);
    }

  }

  const updateBookStock = async (bookId, bookStock) => {
    try {
      await axios.patch(`${BOOK_DETAILS}/${bookId}`, {
        "bookStock": bookStock - 1
      });
      auth.fetchBookData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = (bookId) => {
    console.log(bookId);
    navigate('/updateBook', { state: { book: bookId } });
  }

  const handleDelete = async (bookId) => {
      try {
        await axios.delete(`${BOOK_DETAILS}/${bookId}`);
        alert("Book deleted Successfully");
        auth.fetchBookData();
      } catch (error) {
        console.log("Error in Deleting Book : " + error);
      }
  }

  return (
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
              {data.email === "admin@gmail.com" ?

                <div>
                  <button onClick={() => { handleUpdate(book.id) }}>Update Book</button>
                  <button onClick={() => { handleDelete(book.id) }}>Delete Book</button>
                </div>

                : <button disabled={book.bookStock <= 0} onClick={() => { handleRent(book) }}>Rent Now</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
