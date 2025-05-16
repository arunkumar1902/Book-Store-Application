import React, { useEffect } from 'react'
import axios from 'axios';
import '../../assets/styles/AdminPage.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';


export default function AdminPage() {
  const bookDetailsAPI = import.meta.env.VITE_BOOKDETAILS;

  const navigate = useNavigate();
  const auth = useAuth();
  const booksData = auth.bookDetails;

  useEffect(()=>{
    auth.fetchBookData();
  },[])

  const handleAddBook = () => {
    navigate('/addBook');
  }

  const handleUpdate = (bookId) => {
    console.log(bookId);
    navigate('/updateBook', { state: { book: bookId } });
  }

  const handleDelete = async (book) => {
      if(confirm(`Do you want the Delete the book? : ${book.bookTitle}`)){
        try {
          await axios.delete(`${bookDetailsAPI}/${book.id}`);
          auth.fetchBookData();
          alert("Book deleted Successfully");
        } catch (error) {
          console.log("Error in Deleting Book : " + error);
        }
      }
      else{
        console.log("delete operation cancelled");
      }
  }

  
  return (
    <div className='adminpage'>

      <div className='adminButtons'>
        <button onClick={handleAddBook}>Add New Book</button>
      </div>

      <div className='booksList'>
        <h2>List of Books</h2>
        <br />
        
        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Stocks Available</th>
              <th>Update Book Details</th>
              <th>Delete Book</th>
            </tr>
          </thead>

          {booksData.map((books, index) => (
            <tbody key={books.id}>
              <tr>
                <td>{index + 1}</td>
                <td className='bookImage'><img src={books.bookImage} alt={books.bookTitle}></img></td>
                <td><h4>{books.bookTitle}</h4></td>
                <td><p>{books.bookAuthor}</p></td>
                <td><p>{books.bookStock}</p></td>
                <td><button onClick={() => { handleUpdate(books.id) }}>Update</button></td>
                <td><button onClick={() => { handleDelete(books) }}>Delete</button></td>
              </tr>
            </tbody>

          ))}

        </table>
      </div>

    </div>
  )
}
