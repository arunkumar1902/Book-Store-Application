import { useNavigate } from 'react-router-dom';
import '../../assets/styles/AdminPage.css'


export default function AdminPage() {
  const navigate = useNavigate();


  const handleAddBook = () => {
    navigate('/addBook');
  }

  const handleViewUser = () => {
    navigate('/adminPageUserDetails');
  }
  const handleBookDetails = () => {
    navigate('/adminBookDetils');
  }

  return (
    <div className='adminMainDiv'>
      <h2>Welcome to Admin page</h2>
      <div className='adminpage'>
          <button onClick={handleAddBook}>Add New Book</button>
          <button onClick={handleViewUser}>View User</button>
          <button onClick={handleBookDetails}>Book Details</button>
      </div>  
    </div>
  )
}
