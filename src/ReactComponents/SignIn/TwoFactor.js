import React, {useState} from "react";
import '../CSS/TwoFactor.css';
import CredentialsTemplate from "./CredentialsTemplate";
import {useParams} from 'react-router-dom';

function TwoFactor() {

    const {email} = useParams();

    const [code, setCode] = useState('');

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const twoFactorPage = (
        <>
            <div class="two-factor-container">
                <h1>Two-factor authentication</h1>
                <div class="text-container">
                    <p>We have sent a code to the email address linked with this account. The code is valid for 10 minutes.</p>
                </div>
                <div class="input-form-container">
                    <input type={"text"} value={code} onChange={handleCodeChange} placeholder={"Enter code"}/>
                </div>
                <div class="error-message-container" id="two-factor-error">
                    <p>Incorrect code</p>
                </div>
                <div class="submit-button-container">
                    <button class="submit-button" onClick={() => handleCodeSubmit(code, email)}>Submit</button>
                </div>
            </div>
        </>
    );

    const handleCodeSubmit = (code, email) => {
        console.log("Submit button clicked");
        console.log("Input Code: " + code);
        console.log("Email: " + email);

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('code', code);

        fetch('http://localhost:8080/user-controller/two-factor-authentication-check', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => response.text())
            .then((data) => {
                if (data === "true") {
                    console.log("Correct code");
                    const payload = new URLSearchParams();
                    payload.append('email', email);
                    fetch('http://localhost:8080/user-controller/generate-new-session-token', {
                        method: 'POST',
                        body: payload,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => response.text())
                        .then((data) => {
                            console.log("Session token: " + data);
                            localStorage.setItem("sessionToken", data);
                            localStorage.setItem("email", email);
                        }
                    );
                    window.location.href = "/home";
                } else {
                    console.log("Incorrect code");
                    window.location.href = "/";
                }
            }
        ).catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    }

    return (
        <CredentialsTemplate children1={null} children2={twoFactorPage}></CredentialsTemplate>
    );
}

export default TwoFactor;