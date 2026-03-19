import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../assets/styles/AdminPage.css'
import { useNavigate } from 'react-router-dom';


export default function AdminPage() {
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/BooksDetails');
      setBooksData(response.data);
    } catch (error) {
      alert("Error Fetching Books Details : " + error);
    }
  }

  useEffect(() => {
    fetchBookDetails();
  }, []);
  
  const handleAddBook = () => {
    navigate('/addBook');
  }
  const handleUpdate =()=>{

  }

  return (
    <div className='adminpage'>

      <div className='adminButtons'>
        <button onClick={handleAddBook}>Add New Book</button>
        <button>Delete Book</button>
      </div>



      <div className='booksList'>
        <h2>List of Books</h2>

        <br />
        {booksData.map((books) => (
          <>
            <div className='booksContainer'>

              <div className='bookImage'>
                <img src={books.bookImage} alt={books.bookTitle}></img>
              </div>

              <div className='bookDetails'>
                <h4>{books.bookTitle}</h4>
                <p>Author: {books.bookAuthor}</p>
                <p>Stock : {books.bookStock}</p>
                <br />
                <div>
                  <button onClick={handleUpdate}>Update Book</button>

                </div>
              </div>

            </div>
            <br />
          </>
        ))}
      </div>

    </div>
  )
}
