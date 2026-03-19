import { useEffect, useState } from "react"
import { ADMINEMAIL, USERDETAILSAPI } from "../../../../public/config/env";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../../../assets/styles/ViewUserdetails.css';


export default function AdminPageUserDetails() {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${USERDETAILSAPI}`);
            const userData = response.data;
            setUserDetails(userData);
        }
        fetchData();
    }, []);

    const handleViewUserDetails = (id) => {
        navigate('/viewUserDetails', { state: { userId: id } });
    }
    return (
        <div className="userDetails">
            <div>
                <Link to="/adminPage">Back</Link>
            </div>
            <br />
            <h3 style={{textAlign:'center'}}>User Details: </h3><br />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.email === ADMINEMAIL ? <p>-</p> :
                                <button onClick={() => handleViewUserDetails(user.id)}>View</button>
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
