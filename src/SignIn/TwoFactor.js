import React, {useState} from "react";
import '../CSS/TwoFactor.css';
import CredentialsTemplate from "./CredentialsTemplate";
import { useParams } from 'react-router-dom';

function TwoFactor() {

    const [code, setCode] = useState('');

    const { generatedCode } = useParams();

    console.log("generatedCode from useParams(): " + generatedCode)

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
                    <button class="submit-button" onClick={() => handleCodeSubmit(generatedCode, code)}>Submit</button>
                </div>
            </div>
        </>
    );

    return (
        <CredentialsTemplate children1={null} children2={twoFactorPage}></CredentialsTemplate>
    );
}

function handleCodeSubmit(generatedCode, code) {
    console.log("Submit button clicked");
    console.log("handleSubmit has received this code: " + generatedCode);
    console.log("Input Code: " + code);

    if (generatedCode === code) {
        document.getElementById("two-factor-error").style.display = "none";
        console.log("Code is correct");
        window.location.href = "/home";
    } else {
        document.getElementById("two-factor-error").style.display = "block";
        console.log("Code is incorrect");
    }

}

export default TwoFactor;