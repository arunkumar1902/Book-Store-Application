import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BookDetails from '../bookDetails/BookDetails';
import { useAuth } from '../auth/AuthProvider';

export default function SearchProduct() {
    const location = useLocation();
    const { searchItem } = location.state;

    const auth = useAuth();
    const books = auth.bookDetails;

    const searchTerms = Array.from(searchItem.toLowerCase());

    const filteredBooks = books.filter((bookData) => {
        const BookTitle = bookData.bookTitle.toLowerCase();
        return searchTerms.every((term) => (BookTitle.includes(term)));
    });

    return (
        <div style={{margin:"30px", minHeight:"60vh"}}>
            <p>Result based on your search : {searchItem}</p>
            <br />
            {filteredBooks.length == 0?<p>No result found</p>:<BookDetails booksDetails={filteredBooks}></BookDetails>}
        </div>
    )
}
