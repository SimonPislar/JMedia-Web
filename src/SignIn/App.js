import '../CSS/App.css';
import {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import CreateAccount from "./CreateAccount";
import CredentialsTemplate from "./CredentialsTemplate";
import ForgotPassword from "./ForgotPassword";
import TwoFactor from "./TwoFactor";

function App() {

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

    const routes = (
        <Routes>
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );

    return (
        <CredentialsTemplate children1={routes} children2={loginPage}></CredentialsTemplate>
    );
}

function handle_sign_in(email, password) {
    console.log("Sign in button clicked");
    console.log("Email: " + email); // Used for testing, should be removed later
    console.log("Password: " + password); // Used for testing, should be removed later

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost:8080/userController/LoginAttempt', {
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
                // The user was successfully logged in
                console.log("User successfully logged in");
                document.getElementsByClassName("incorrect-credentials-container")[0].style.display = "none";
                document.getElementsByClassName("login-form-container")[0].style.height = "20em";
                // eslint-disable-next-line no-template-curly-in-string
                fetch(`http://localhost:8080/userController/twoFactorAuthenticator?email=${email}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(generatedCode => {
                        // Handle the response data here
                        console.log("Fetch has received this code: " + generatedCode);
                        // Redirect to the new URL with the generatedCode
                        //window.location.href = `/two-factor-authentication/${generatedCode}`;
                        window.location.href = `/two-factor-authentication/${generatedCode}`;
                    })
                    .catch(error => {
                        // Handle any errors here
                        console.error('Fetch error:', error);
                    });

            } else {
                // The user was not successfully logged in
                console.log("User not successfully logged in");
                document.getElementsByClassName("incorrect-credentials-container")[0].style.display = "block";
                document.getElementsByClassName("login-form-container")[0].style.height = "22em";
            }
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
}

export default App;
