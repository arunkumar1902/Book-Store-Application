import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import axios from "axios";
import { USERDETAILSAPI } from "../../../../public/config/env";
import '../../../assets/styles/ViewUserDetails.css';

export default function ViewUserDetails() {
    const location = useLocation();
    const { userId } = location.state;

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${USERDETAILSAPI}/${userId}`);
                setUserData(response.data);
            } catch (error) {
                alert("Error Occured : ", error);
                setUserData(null);
            }
        }
        fetchData();
    }, [userId])

    return (
        <div className="viewUserDetailsDiv">
            <div>
                <Link to="/adminPageUserDetails">Back</Link>
            </div>
            <h3>User Details</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{userData.username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{userData.address}</td>
                    </tr>
                </tbody>
            </table><br />

            <h4>Currently Rented Books :</h4><br />
            {
                userData.booksRented &&
                    userData.booksRented.length === 0 ? <p>No Books Rented</p> :
                    <div>

                        <div className="rentedBooksContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Book ID</th>
                                        <th>Book Name</th>
                                        <th>Author</th>
                                        <th>Rented Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.booksRented &&
                                        userData.booksRented.map((item, index) => (
                                            <tr key={item.bookId}>
                                                <td>{index + 1}.</td>
                                                <td>{item.bookId}</td>
                                                <td>{item.bookTitle}</td>
                                                <td>{item.bookAuthor}</td>
                                                <td>{item.rentedDate} <br /> {item.rentedTime}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

            }
            <br />

            <h4>Returned Books : </h4><br />
            {
                userData.returnedBooks &&
                    userData.returnedBooks.length === 0 ? <p>No Books Returned</p> :
                    <div className="rentedBooksContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Book ID</th>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Rented Date</th>
                                    <th>Returned Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.returnedBooks &&
                                    userData.returnedBooks.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
                                            <td>{item.bookId}</td>
                                            <td>{item.bookTitle}</td>
                                            <td>{item.bookAuthor}</td>
                                            <td>{item.rentedDate} <br />{item.rentedTime}</td>
                                            <td>{item.returnDate} <br />{item.returnTime}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}
