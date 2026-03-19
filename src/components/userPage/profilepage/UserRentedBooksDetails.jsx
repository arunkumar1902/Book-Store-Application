import React from 'react'
import axios from 'axios';
import { useAuth } from '../../auth/AuthProvider';

export default function UserRentedBooksDetails({ userData }) {
    const userDetailsAPI = import.meta.env.VITE_USERDETAILS;
    const bookDetailsAPI = import.meta.env.VITE_BOOKDETAILS;

    const auth = useAuth();

    const updateStock = async (bookid, bookStock) => {
        try {
            await axios.patch(`${bookDetailsAPI}/${bookid}`, {
                "bookStock": bookStock + 1
            });
            auth.fetchBookData();
        } catch (error) {
            alert("Error Occurred while returing the book, try again : ",error);
        }
    }

    const returnBook = async (bookData) => {
        try {
            const returnBookData = {
                "id": Date.now(),
                "bookId": bookData.bookId,
                "bookAuthor": bookData.bookAuthor,
                "bookTitle": bookData.bookTitle,
                "rentedDate": bookData.rentedDate,
                "rentedTime": bookData.rentedTime,
                "returnDate": new Date().toLocaleDateString(),
                "returnTime": new Date().toLocaleTimeString()
            }
            const update = userData.booksRented.filter((book) => (book.bookId !== bookData.bookId));

            const updateReturnedBooks = {
                "booksRented": update,
                "returnedBooks": [
                    ...userData.returnedBooks,
                    returnBookData
                ]
            }

            await axios.patch(`${userDetailsAPI}/${userData.id}`, updateReturnedBooks);
            await auth.fetchUserData(userData.id);

            const response = await axios.get(`${bookDetailsAPI}/${bookData.bookId}`);
            const bookStock = response.data.bookStock;
            await updateStock(bookData.bookId, bookStock);
            alert("Book Returned Successfully");

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='userRentBook'>
            {!userData.booksRented || userData.booksRented.length === 0
                ? <p>No Books Rented</p>
                : <div className='BooksList'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Return</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.booksRented.map((BooksRented, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{BooksRented.bookTitle}</td>
                                    <td>{BooksRented.bookAuthor}</td>
                                    <td><button onClick={() => returnBook(BooksRented)}>Return</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
