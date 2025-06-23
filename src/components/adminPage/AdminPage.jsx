import React, { useEffect } from 'react'
import axios from 'axios';
import '../../assets/styles/AdminPage.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { BOOKDETAILSAPI } from '../../config/env';


export default function AdminPage() {

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
          await axios.delete(`${BOOKDETAILSAPI}/${book.id}`);
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

  const handleViewUser = () => {
    navigate('/adminPageUserDetails');
  }

  return (
    <div className='adminpage'>

      <div className='adminButtons'>
        <button onClick={handleAddBook}><i className='fa fa-plus'></i> Add New Book</button>
        <button onClick={handleViewUser}>View User</button>
      </div>

      <div className='booksList'>
        <h2>List of Books</h2>
        <br />

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Description</th>
              <th>Update Book</th>
              <th>Delete Book</th>
            </tr>
          </thead>

          {booksData.map((books, index) => (
            <tbody key={books.id}>
              <tr>
                <td>{index + 1}</td>
                <td className='bookImage'><img src={books.bookImage} alt={books.bookTitle}></img></td>
                <td>
                  <p><i>{books.bookTitle}</i></p><br />
                  <p><b>Author: </b>{books.bookAuthor}</p><br />
                  <p><b>Available Stock: </b>{books.bookStock}</p><br />
                </td>
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
