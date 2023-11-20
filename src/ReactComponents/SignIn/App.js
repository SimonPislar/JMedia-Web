import '../CSS/App.css';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import CredentialsTemplate from "./CredentialsTemplate";


function App() {

    const formData = new URLSearchParams();
    formData.append('sessionToken', localStorage.getItem('sessionToken'));
    formData.append('email', localStorage.getItem('email'));
    fetch ('http://localhost:8080/user-controller/check-session-token', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => response.text())
        .then((data) => {
                if (data === "true") {
                    window.location.href = "/home";
                }
            }
        );

    const [username, setUsername] = useState(''); // username is the state variable, setUsername is the function that updates the state variable
    const [password, setPassword] = useState(''); // password is the state variable, setPassword is the function that updates the state variable

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const loginPage = (
        <>
            <div class="login-form-container">
                <div className="login-header">
                    <h1 class="sign-in-header">Sign In</h1>
                </div>
                <div className="input-form">
                    <input type="text" value={username} onChange={handleUsernameChange} placeholder="Email"/>
                </div>
                <div className="input-form">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
                </div>
                <div>
                    <Link to="/forgot-password" class="link">Forgot Password?</Link>
                </div>
                <div className="sign-in-button-container">
                    <button className="sign-in-button" onClick={() => handle_sign_in(username, password)}>Submit</button>
                </div>
                <div className="incorrect-credentials-container">
                    <p>Incorrect username or password</p>
                </div>
                <div className="sign-up-container">
                    <p>Don't have an account?</p>
                    <Link to="/create-account" class="link">Sign Up</Link>
                </div>
            </div>
        </>
    );

    const handle_sign_in = (email, password) => {
        console.log("Sign in button clicked");
        console.log("Email: " + email); // Used for testing, should be removed later
        console.log("Password: " + password); // Used for testing, should be removed later

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        fetch('http://localhost:8080/user-controller/login-request', {
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
                if (data === "true") {
                    // Generate two-factor authentication code
                    generate_two_factor_authentication_code(email);
                    // The user was successfully logged in
                    console.log("User credentials are correct");
                    document.getElementsByClassName("incorrect-credentials-container")[0].style.display = "none";
                    document.getElementsByClassName("login-form-container")[0].style.height = "20em";
                    // eslint-disable-next-line no-template-curly-in-string
                    window.location.href = `/two-factor-authentication/${email}`;

                } else {
                    // The user was not successfully logged in
                    console.log("User not successfully logged in");
                    document.getElementsByClassName("incorrect-credentials-container")[0].style.display = "block";
                    document.getElementsByClassName("login-form-container")[0].style.height = "22em";
                }
            }
        ).catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    }

    const generate_two_factor_authentication_code = (email) => {
        const formData = new URLSearchParams();
        formData.append('email', email);

        fetch ('http://localhost:8080/user-controller/set-two-factor-authentication-code', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => response.text())
            .then((data) => {
                if (data === "Set") {
                    console.log("Two-factor authentication code successfully generated");
                }
            }
        );
    }

    return (
        <CredentialsTemplate children1={null} children2={loginPage}></CredentialsTemplate>
    );
}

export default App;
