import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './components/Forms/SignupPage'
import LoginPage from './components/Forms/LoginPage'
import LandingPage from './components/home/LandingPage'
import AdminPage from './components/adminPage/AdminPage'
import AddBook from './components/adminPage/AddBook'
import UpdateBook from './components/adminPage/UpdateBook'
import BookRental from './components/userPage/BookRental'
import PrivateRoute from './components/auth/PrivateRoute'
import AuthProvider from './components/auth/AuthProvider'
import UserRentedBooksDetails from './components/userPage/profilepage/UserRentedBooksDetails'
import Header from './components/home/Header'
import UserProfile from './components/userPage/profilepage/UserProfile'
import SearchProduct from './components/searchProduct/SearchProduct'
import Footer from './components/home/Footer'
import UserCart from './components/cart/UserCart'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import AdminPageUserDetails from './components/adminPage/adminPageUserdetails/AdminPageUserDetails'
import ViewUserDetails from './components/adminPage/viewUserDetails/ViewUserDetails'

function App() {


  return (
    <>
      <AuthProvider>
        <Header></Header>
        <div className='main'>
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='loginPage' element={<LoginPage />}></Route>
            <Route path='signupPage' element={<SignupPage />}></Route>
            <Route path='forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route path='adminPage' element={<AdminPage></AdminPage>}></Route>
              <Route path='updateBook' element={<UpdateBook></UpdateBook>}></Route>
              <Route path='addBook' element={<AddBook ></AddBook>}></Route>
              <Route path='bookRental' element={<BookRental></BookRental>}></Route>
              <Route path='userRentedBooksDetails' element={<UserRentedBooksDetails></UserRentedBooksDetails>}></Route>
              <Route path='userProfile' element={<UserProfile></UserProfile>}></Route>
              <Route path='searchProduct' element={<SearchProduct></SearchProduct>}></Route>
              <Route path='userCart' element={<UserCart></UserCart>}></Route>
              <Route path='adminPageUserDetails' element={<AdminPageUserDetails></AdminPageUserDetails>}></Route>
              <Route path='viewUserDetails' element={<ViewUserDetails></ViewUserDetails>}></Route>
            </Route>
          </Routes>
        </div>
        <Footer></Footer>
      </AuthProvider>
    </>
  )
}

export default App
