import React, { useState } from 'react'
import axios from 'axios'
import '../../assets/styles/Forms.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { BOOKDETAILSAPI } from '../../../public/config/env';


export default function AddBook() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [bookDetails, setBookDetails] = useState({
        bookTitle: '',
        bookImage: '',
        bookAuthor: '',
        bookStock: ''
    });

    const handleChanges = (event) => {
        const { name, value } = event.target;
        setBookDetails((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${BOOKDETAILSAPI}`, bookDetails);

            alert("Book Added Successfully");
            setBookDetails({
                bookTitle: '',
                bookImage: '',
                bookAuthor: '',
                bookStock: ''
            });
            await auth.fetchBookData();

        } catch (error) {
            alert("Error in Adding Book : " + error);
        }
    }

    const handleCancel = ()=>{
        if(confirm('Do You want to Cancel? ')){
            setBookDetails({
                bookTitle: '',
                bookImage: '',
                bookAuthor: '',
                bookStock: ''
            });
            navigate('/adminPage');
        }
    }

    return (
        <>
            <div className='maindiv'>
                <div className="formdiv">
                    <h2>Add New Book</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="bookTitle">Book Title</label>
                            <input
                                type="text"
                                id='bookTitle'
                                name='bookTitle'
                                placeholder='Enter Book Title'
                                value={bookDetails.bookTitle}
                                onChange={handleChanges}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bookImage">Cover Image URL</label>
                            <input
                                type='url'
                                id='bookImage'
                                name='bookImage'
                                placeholder='Enter Book Image'
                                value={bookDetails.bookImage}
                                onChange={handleChanges}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bookAuthor">Author</label>
                            <input
                                type="text"
                                id='bookAuthor'
                                name='bookAuthor'
                                placeholder='Enter Book Author'
                                value={bookDetails.bookAuthor}
                                onChange={handleChanges}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="bookStock">Stock</label>
                            <input
                                type="number"
                                min='0'
                                id='bookStock'
                                name='bookStock'
                                placeholder='Enter Book Stock'
                                value={bookDetails.bookStock}
                                onChange={handleChanges}
                                required
                            />
                        </div>

                        <div>
                            <button type='submit'>Submit</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
