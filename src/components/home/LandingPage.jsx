import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/LandingPage.css'

export default function LandingPage() {
    return (
        <div className='landingPageDiv'>
            <div className='userlogin'>
                <h3> Create a New Account? </h3><br />
                <Link to='signupPage'>Signup</Link>
                <br /><br />
                <h3>Already have an Account?</h3><br />
                <Link to='loginPage'>Login</Link>
            </div>
        </div>
    )
}
