import React, { useState } from 'react'

const FormValidation = (WrappedComponent) => {
    return ((props) => {
        const [data, setData] = useState({
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        });

        const [error, setError] = useState({
            usernameError: '',
            emailError: '',
            passwordError: '',
            confirmpasswordError: ''
        });


        const handleChange = (event) => {
            const { name, value } = event.target;
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        };

        const validation = () => {
            const usernamePattern = /^[a-zA-Z]{2,20}$/;
            const emailPattern = /^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,25}$/;
            const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;
            let isValid = true;

            //username validation
            if (props.formtype === "signup") {
                if (!usernamePattern.test(data.username)) {
                    setError((prevError) => ({
                        ...prevError,
                        usernameError: 'Enter name with only alphabets'
                    }));
                    isValid = false;
                } else {
                    setError((prevError) => ({
                        ...prevError,
                        usernameError: ''
                    }));
                }
            }

            //email validation
            if (!emailPattern.test(data.email)) {
                setError((prevError) => ({
                    ...prevError,
                    emailError: 'Enter valid Email ID'
                }));
                isValid = false;
            } else {
                setError((prevError) => ({
                    ...prevError,
                    emailError: ''
                }));
            }

            //password validation
            if (data.password === "" || !passwordPattern.test(data.password)) {
                setError((prevError) => ({
                    ...prevError,
                    passwordError: "Password must contain atleast 1 Special Character, 1 number, 1 uppercase and 1 lowercase alphabet with atleast 7 characters"
                }));
                isValid = false;
            } else {
                setError((prevError) => ({
                    ...prevError,
                    passwordError: ''
                }));
            }

            //confirm password validation
            if (props.formtype === 'signup') {
                if (data.confirmpassword === "" || data.confirmpassword !== data.password) {
                    setError((prevError) => ({
                        ...prevError,
                        confirmpasswordError: "Password does not match"
                    }));
                    isValid = false
                } else {
                    setError((prevError) => ({
                        ...prevError,
                        confirmpasswordError: ''
                    }));
                }
            }

            return isValid;

        }


        return (
            <WrappedComponent
                {...props}
                data={data}
                error={error}
                handleChange={handleChange}
                validation={validation}
            ></WrappedComponent>
        );
    });

}


export default FormValidation;
