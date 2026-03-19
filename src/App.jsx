import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './components/Forms/SignupPage'
import LoginPage from './components/Forms/LoginPage'
import LandingPage from './components/LandingPage'

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
      </Routes>
    </>
  )
}

export default App
