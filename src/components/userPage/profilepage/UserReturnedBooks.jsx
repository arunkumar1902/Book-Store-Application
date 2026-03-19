import React from 'react'

export default function UserReturnedBooks({ userData }) {
    return (
        <div>
            {!userData.returnedBooks || userData.returnedBooks.length === 0
                ? <p>No Books Returned</p>
                : <div className='BooksList'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Rented Date</th>
                                <th>Returned Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.returnedBooks.map((BooksReturned, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{BooksReturned.bookTitle}</td>
                                    <td>{BooksReturned.bookAuthor}</td>
                                    <td>{BooksReturned.rentedDate} <br /><br /> {BooksReturned.rentedTime}</td>
                                    <td>{BooksReturned.returnDate} <br /><br /> {BooksReturned.returnTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
