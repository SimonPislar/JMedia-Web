import React from "react";
import './CSS/Home.css';

function Home() {
    return (
        <div class="home-container">
            <div class="left-menu-container">
                <div class="left-menu">
                    <button className="left-menu-button">&#60;</button>
                    <button className="left-menu-button">Home</button>
                </div>
            </div>
        </div>
    );
}

export default Home;