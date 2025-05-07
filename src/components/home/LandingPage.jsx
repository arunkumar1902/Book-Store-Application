import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/LandingPage.css'

export default function LandingPage() {
    return (
        <div className='userlogin'>
            <Link to='loginPage'>Login</Link>&emsp;
            <Link to='signupPage'>Signup</Link>
        </div>
    )
}
