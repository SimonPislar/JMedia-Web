import React from "react";
import '../CSS/CredentialsTemplate.css';

function CredentialsTemplate({ children1, children2 }) {
    return (
        <div className="login-container">
            {children1}
            <div className="login">
                {children2}
            </div>
        </div>
    );
}

export default CredentialsTemplate;