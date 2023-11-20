import React, {useState} from 'react';
import '../CSS/CreateAccount.css';
import CredentialsTemplate from "./CredentialsTemplate";
import {Link, Route, Routes} from "react-router-dom";
import App from "./App";

function CreateAccount() {

    const [username, setUsername] = useState(''); // username is the state variable, setUsername is the function that updates the state variable
    const [password, setPassword] = useState(''); // password is the state variable, setPassword is the function that updates the state variable
    const [confirmPassword, setConfirmPassword] = useState(''); // confirmPassword is the state variable, setConfirmPassword is the function that updates the state variable
    const [email, setEmail] = useState(''); // email is the state variable, setEmail is the function that updates the state variable
    const [firstName, setFirstName] = useState(''); // firstName is the state variable, setFirstName is the function that updates the state variable
    const [lastName, setLastName] = useState(''); // lastName is the state variable, setLastName is the function that updates the state variable

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const createAccountPage = (
        <>
            <div class="create-account-container">
                <div className="create-account-header-container">
                    <h1>Create Account</h1>
                </div>
                <div className="create-account-form">
                    <div className="input-form-container">
                        <div className="input-form">
                            <input id="firstName" type="text" value={firstName} onChange={handleFirstNameChange} placeholder="First Name"/>
                        </div>
                        <div className="input-form">
                            <input id="lastName" type="text" value={lastName} onChange={handleLastNameChange} placeholder="Last Name"/>
                        </div>
                    </div>
                    <div class="input-form-container">
                        <div class="input-form">
                            <input id="username" type="text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
                        </div>
                        <div class="input-form">
                            <input id="email" type="text" value={email} onChange={handleEmailChange} placeholder="Email"/>
                        </div>
                    </div>
                    <div class="input-form-container">
                        <div class="input-form">
                            <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
                        </div>
                        <div class="input-form">
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"/>
                        </div>
                    </div>
                </div>
                <div class="create-account-button-container">
                    <button class="create-account-button" onClick={ () => handleCreateAccount(firstName, lastName, username, email, password, confirmPassword)}>Create account</button>
                </div>
                <div class="already-have-account-container">
                    <p>Already have an account? <Link to="/" class="link">Sign in</Link> </p>
                </div>
            </div>
        </>
    );

    return (
        <CredentialsTemplate children2={createAccountPage}></CredentialsTemplate>
    );
}

//TODO: fix error
function userExists(email) {
    fetch('http://localhost:8080/user-controller/get-user-by-email?email=' + email)
        .then((response) => response.text())
        .then((data) => {
                // 'data' will contain the response from the backend
                console.log(data);
                return data === "true";

            }
        );
}

async function handleCreateAccount(firstName, lastName, username, email, password, confirmPassword) {
    let valid = true;
    if (!validate_password(password, confirmPassword)) {
        valid = false;
        console.log("Passwords do not match");
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("confirmPassword").style.borderColor = "red";
    } else {
        console.log("Passwords match");
        document.getElementById("password").style.borderColor = "white";
        document.getElementById("confirmPassword").style.borderColor = "white";
    }
    if (!validate_email(email)) {
        valid = false;
        console.log("Invalid email");
        document.getElementById("email").style.borderColor = "red";
    } else {
        console.log("Valid email");
        document.getElementById("email").style.borderColor = "white";
    }
    if (!validate_username(username)) {
        valid = false;
        console.log("Invalid username");
        document.getElementById("username").style.borderColor = "red";
    } else {
        console.log("Valid username");
        document.getElementById("username").style.borderColor = "white";
    }
    if (!validate_first_name(firstName)) {
        valid = false;
        console.log("Invalid first name");
        document.getElementById("firstName").style.borderColor = "red";
    } else {
        console.log("Valid first name");
        document.getElementById("firstName").style.borderColor = "white";
    }
    if (!validate_last_name(lastName)) {
        valid = false;
        console.log("Invalid last name");
        document.getElementById("lastName").style.borderColor = "red";
    } else {
        console.log("Valid last name");
        document.getElementById("lastName").style.borderColor = "white";
    }
    if (await userExists(email)) {
        valid = false;
        console.log("User already exists");
        document.getElementById("email").style.borderColor = "red";
    } else {
        console.log("User does not already exist");
        document.getElementById("email").style.borderColor = "white";
    }

    if (valid) {
        console.log("Valid form");
        document.getElementById("firstName").style.borderColor = "white";
        document.getElementById("lastName").style.borderColor = "white";
        document.getElementById("username").style.borderColor = "white";
        document.getElementById("email").style.borderColor = "white";
        document.getElementById("password").style.borderColor = "white";
        document.getElementById("confirmPassword").style.borderColor = "white";
        sendCreateAccountRequest(firstName, lastName, username, email, password);
    }
}

function sendCreateAccountRequest(firstName, lastName, username, email, password) {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    fetch('http://localhost:8080/user-controller/add-user', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then((response) => response.text())
        .then((data) => {
            // 'data' will contain the response from the backend
            console.log(data);
            if (data === "Saved") {
                // The user was successfully logged in
                console.log("User successfully added");
                window.location.href = "/";
            } else {
                // The user was not successfully logged in
                console.log("User not successfully added");
            }
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
}

function validate_username(username) {
    return username.length > 0;
}

function validate_first_name(firstName) {
    return firstName.length > 0;
}

function validate_last_name(lastName) {
    return lastName.length > 0;
}

function validate_email(email) {
    return !!(email.includes("@") && email.includes(".") && email.length >= 5);
}

function validate_password(password, confirmPassword) {
    return password === confirmPassword && password.length >= 8;
}

export default CreateAccount;