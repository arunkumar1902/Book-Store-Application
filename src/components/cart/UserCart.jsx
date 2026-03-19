import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';
import '../../assets/styles/UserCart.css'
import { USERDETAILSAPI } from '../../config/env';
import { Link } from 'react-router-dom';

export default function UserCart() {
  const auth = useAuth();
  const data = auth.user;
  const bookDetails = auth.bookDetails;

  const [cartItems, setCartBooks] = useState([]);

  useEffect(() => {
    const CART_BOOKS_ID = data.cartDetails.map((cartBook) => cartBook.bookId);
    console.log(CART_BOOKS_ID);

    const BOOKS_IN_CART = bookDetails.filter((book) => CART_BOOKS_ID.includes(book.id));
    setCartBooks(BOOKS_IN_CART);
    
  }, [bookDetails, data]);

  const handleCartItemRemove = async (removeBookId) => {
    const filteredCart = data.cartDetails.filter((cartBook => cartBook.bookId !== removeBookId));

    try {
      await axios.patch(`${USERDETAILSAPI}/${data.id}`, {
        "cartDetails": filteredCart
      });
      auth.fetchUserData(data.id);
    } catch (error) {
      alert("Error in removing Book from Cart, try again : ", error);
    }
  }

  return (
    <div className='cart_wrapper'>
      <h2 style={{textAlign:'center', padding:'20px'}}>My Cart</h2>

      <div className='cartDetails_container'>
        
        {cartItems.length === 0

          ? <div className='emptyCart'>
            <img src="https://www.sajalenterprises.in/assets/images/empty-cart.png" alt="Empty Cart" />
            <div className='emptyCartText'>
              <p>Your Shopping Cart is currently empty. To add Books in your Shopping Cart, start by searching or browsing through our book store. When a book interests you, click on Add to Cart button.</p>
              <br />
              <p>Please <Link to='/bookRental'>Click</Link> here to continue.</p>
            </div>
            <br /><br />
          </div>

          : <div className='cartItems'>
            {cartItems.map(book => (
              <div key={book.id} className='individual_cartBooks'>
                {/* <input type="checkbox" /> */}

                <div className='cartImage'>
                  <img src={book.bookImage} alt={book.bookTitle} />
                </div>

                <div className='bookDescription'>
                  <h4>{book.bookTitle}</h4>
                  <br />
                  <p>Author: {book.bookAuthor}</p>
                  {book.bookStock <= 0 && <span style={{color:'red'}}>(Out of Stock)</span>}
                  
                  <br />
                  <div>
                    <button onClick={() => handleCartItemRemove(book.id)}>Remove From Cart</button>
                  </div>
                </div>

              </div>
            ))}
            {/* <button>Rent</button><br /> */}
          </div>
        }
      </div>

    </div>
  )
}
