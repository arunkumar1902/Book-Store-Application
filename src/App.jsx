import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './components/Forms/SignupPage'
import LoginPage from './components/Forms/LoginPage'
import LandingPage from './components/LandingPage'
import AdminPage from './components/adminPage/AdminPage'
import AddBook from './components/adminPage/AddBook'
import UpdateBook from './components/adminPage/UpdateBook'
import BookRental from './components/userPage/BookRental'

function App() {

  return (
    <>
      <div className='header'>
        <header>
          <h1>Book Store</h1>
        </header>
      </div>


      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='loginPage' element={<LoginPage />}></Route>
        <Route path='signupPage' element={<SignupPage formtype='signup' />}></Route>
        <Route path='adminPage' element={<AdminPage></AdminPage>}></Route>
        <Route path='addBook' element={<AddBook ></AddBook>}></Route>
        <Route path='updateBook' element={<UpdateBook></UpdateBook>}></Route>
        <Route path='bookRental' element={<BookRental></BookRental>}></Route>
      </Routes>
    </>
  )
}

export default App
