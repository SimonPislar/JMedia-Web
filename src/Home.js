import React from "react";
import './ReactComponents/CSS/Home.css';
import HomeTemplate from "./HomeTemplate";

function Home() {

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
                if (data === "false") {
                    window.location.href = "/";
                }
            }
        );

    return (
        <HomeTemplate />
    );
}

export default Home;