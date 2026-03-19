import React, { useEffect } from 'react'
import '../../assets/styles/UserPage.css'
import { useAuth } from '../auth/AuthProvider';
import BookDetails from '../bookDetails/BookDetails';

export default function BookRental() {
  const auth = useAuth();
  const data = auth.user;
  const booksDetails = auth.bookDetails;

  useEffect(()=>{
    auth.fetchBookData();
  },[])

  return (

    <div className="userpage">

      <div className='welcomeDiv'>
        <h2> Welcome {data.username}!</h2>
        <img src="https://www.quercusbooks.co.uk/wp-content/uploads/2019/01/Spines-website-asset-new-logo.jpg?w=1920&h=560&crop=1" alt="Book Store image" />
      </div>

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
