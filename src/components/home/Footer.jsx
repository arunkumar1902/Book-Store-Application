import React from 'react'
import '../../assets/styles/Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <hr />

            <div className='about' id='about'>
                <h4>About</h4>
                <br /><hr /><br />

                <p >
                    At <strong>Book Store</strong>, we believe that knowledge should be accessible, affordable, and sustainable.
                    Whether you're a student, a book lover, or a casual reader, our mission is to connect you with the books you love—without the high costs of buying new.

                    Founded in 2025, BookRentals started with a simple idea: to make reading more affordable and eco-friendly.
                    By offering a wide selection of books for rent—from academic textbooks to best-selling novels—we help readers save money and reduce waste.
                </p>
                <br />
                <p>
                    Our platform makes it easy to browse, rent, and return books—all from the comfort of your home. With flexible rental periods, doorstep delivery, and no late fees,
                    we're redefining how people access books in the digital age.
                    Thank you for being part of our journey. Together, let’s make reading a shared experience that benefits everyone.
                </p>
            </div>
            <br />

            <div className='copyright'>
                <hr />
                <div className='contact' id='contact'>
                    <p>&copy; {new Date().getFullYear()} Book Store. All Rights Reserved.</p>
                    <p>Contact</p>
                </div>
            </div>

        </div>
    )
}
