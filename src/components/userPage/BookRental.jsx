import React, { useEffect } from 'react'
import '../../assets/styles/UserPage.css'
import { useAuth } from '../auth/AuthProvider';
import BookDetails from '../bookDetails/BookDetails';

export default function BookRental() {
  const auth = useAuth();
  const booksDetails = auth.bookDetails;

  useEffect(()=>{
    auth.fetchBookData();
  },[])

  return (

    <div className="userpage">

      <div className='bookpage'>
          {
            booksDetails.length == 0 ?
              <h2>No results found</h2> :
              <BookDetails booksDetails={booksDetails}></BookDetails>
          }
          </div>
    </div>

  )
}
