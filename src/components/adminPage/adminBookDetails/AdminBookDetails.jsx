import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { BOOKDETAILSAPI } from "../../../../public/config/env";
import '../../../assets/styles/AdminPage.css'
import axios from "axios";
import { useEffect } from "react";

export default function AdminBookDetails() {
    const navigate = useNavigate();
      const auth = useAuth();
      const booksData = auth.bookDetails;
    
      useEffect(()=>{
        auth.fetchBookData();
      },[]);
    
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

  return (
    <div className='booksList'>
        <Link to='/adminPage'>Back</Link>
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
  )
}
