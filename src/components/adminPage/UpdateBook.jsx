import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { BOOKDETAILSAPI } from '../../config/env';

export default function UpdateBook() {
    const auth = useAuth();

    const [bookDetails, setBookDetails] = useState({
        bookTitle:'',
        bookImage:'',
        bookAuthor:'',
        bookStock:''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { book } = location.state;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BOOKDETAILSAPI}/${book}`);
            setBookDetails(response.data);
        } catch (error) {
            console.log("Error Fetching Data : " + error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleChanges = (event) => {
        const { name, value } = event.target;

        const updatedValue = (name === "bookStock" ? Number(value) : value);
        setBookDetails((prevData) => ({
            ...prevData,
            [name]: updatedValue
        }));
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            await axios.patch(`${BOOKDETAILSAPI}/${book}`, bookDetails);
            alert("Book updated Successfully");
            await auth.fetchBookData();
            navigate('/adminPage');
        } catch (error) {
            console.log("Error in Submitting : " + error);
        }
    }

    return (
        <>
            <div className='back'>
                <Link to='/adminPage'>Back</Link>
            </div>
            <div className='maindiv'>
                <div className="formdiv">
                    <h2>Update Book</h2>
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
                            <label htmlFor="bookImage">Cover Image</label>
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
