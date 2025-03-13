import React, { useState } from 'react'
import axios from 'axios'
import '../../assets/styles/Forms.css'
import { Link } from 'react-router-dom';


export default function AddBook() {

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
            await axios.post('http://localhost:3000/BooksDetails', bookDetails)
                .then((response) => {
                    alert("Book Added Successfully");
                    setBookDetails({
                        bookTitle: '',
                        bookImage: '',
                        bookAuthor: '',
                        bookStock: ''
                    });
                })
                .catch((error) => {
                    alert("Unable to Add Book : " + error);
                })
        } catch (error) {
            alert("Error in Adding Book : " + error);
        }
    }

    return (
        <>
            <div className='back'>
                <Link to='/adminPage'>Back</Link>
            </div>
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
                                value={bookDetails.bookStock}
                                onChange={handleChanges}
                                required
                            />
                        </div>

                        <div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
