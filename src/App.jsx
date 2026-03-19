import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './components/Forms/SignupPage'
import LoginPage from './components/Forms/LoginPage'
import LandingPage from './components/LandingPage'
import AdminPage from './components/adminPage/AdminPage'
import AddBook from './components/adminPage/AddBook'
import UpdateBook from './components/adminPage/UpdateBook'
import BookRental from './components/userPage/BookRental'
import PrivateRoute from './components/auth/PrivateRoute'
import AuthProvider from './components/auth/AuthProvider'

function App() {


  return (
    <>
      <div className='header'>
        <header>
          <h1>Book Store</h1>
        </header>
      </div>


      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='loginPage' element={<LoginPage />}></Route>
          <Route path='signupPage' element={<SignupPage />}></Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path='adminPage' element={<AdminPage></AdminPage>}></Route>
            <Route path='updateBook' element={<UpdateBook></UpdateBook>}></Route>
            <Route path='addBook' element={<AddBook ></AddBook>}></Route>
            <Route path='bookRental' element={<BookRental></BookRental>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
