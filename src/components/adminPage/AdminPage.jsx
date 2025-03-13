import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../assets/styles/AdminPage.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';


export default function AdminPage() {
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/BooksDetails');
      setBooksData(response.data);
    } catch (error) {
      alert("Error Fetching Books Details : " + error);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('site'));
    if (data) {
      fetchBookDetails();
    } else {
      navigate('/loginPage');
    }
  }, []);

  const handleAddBook = () => {
    navigate('/addBook');
  }

  const handleUpdate = (bookId) => {
    console.log(bookId);
    navigate('/updateBook', { state: { book: bookId } });
  }

  const handleDelete = async (bookId) => {
      try {
        await axios.delete(`http://localhost:3000/BooksDetails/${bookId}`);
        fetchBookDetails();
        alert("Book deleted Successfully");
      } catch (error) {
        console.log("Error in Deleting Book : " + error);
      }
  }

  return (
    <div className='adminpage'>

      <div className='adminButtons'>
        <button onClick={handleAddBook}>Add New Book</button>
        <button onClick={() => (auth.logout())}>Logout</button>
      </div>



      <div className='booksList'>
        <h2>List of Books</h2>

        {booksData.map((books) => (
          <div className='booksContainer' key={books.id}>

            <div className='bookImage'>
              <img src={books.bookImage} alt={books.bookTitle}></img>
            </div>

            <div className='bookDetails'>
              <h4>{books.bookTitle}</h4>
              <p>Author: {books.bookAuthor}</p>
              <p>Stock : {books.bookStock}</p>
              <div>
                <button onClick={() => { handleUpdate(books.id) }}>Update Book</button>
                <button onClick={() => { handleDelete(books.id) }}>Delete Book</button>
              </div>
            </div>
          </div>

        ))}
      </div>

    </div>
  )
}
