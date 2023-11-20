import React, {useState} from 'react';
import '../CSS/ForgotPassword.css';
import CredentialsTemplate from "./CredentialsTemplate";
import {Link} from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState(''); // email is the state variable, setEmail is the function that updates the state variable

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    /*
    * 1. Ask for email-address
    * 2. Send email with link to reset password
    * 3. User clicks on link and is redirected to reset password page
    * 4. User enters new password
    * 5. User clicks on submit button
    * 6. Password is reset
    * 7. User is redirected to login page
    */

    const forgotPasswordPage = (
        <>
            <div class="forgot-password-container">
                <div className="forgot-password-header">
                    <h1 class="header-container">Forgot Password</h1>
                </div>
                <div class="forgot-password-text">
                    <p>Enter your email address. If it matches</p>
                    <p>an account in our system, we will send you</p>
                    <p>an email with a link to reset your password.</p>
                </div>
                <div className="input-form">
                    <input type="text" value={email} onChange={handleEmailChange} placeholder="Email"/>
                </div>
                <div class="submit-button-container">
                    <button class="submit-button" onClick={() => handleSubmit(email)}>Submit</button>
                </div>
                <div class="back-to-login-container">
                    <p class="remember-password-text">Remembered your password? </p>
                    <Link to={"/"} class="link">Sign in</Link>
                </div>
            </div>
        </>
    );

    return (
        <CredentialsTemplate children1={null} children2={forgotPasswordPage}></CredentialsTemplate>
    );
}

function handleSubmit(email) {
    console.log("Submit button clicked")

    const result = fetch('http://localhost:8080/user-controller/send-forgot-password-email?email=' + email)
        .then((response) => response.text())
        .then((data) => {
            // 'data' will contain the response from the backend
            console.log(data);
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    window.location.href = "/";
}


export default ForgotPassword;