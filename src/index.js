// Inside your index.js or App.js (whichever is the top-level component)
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './SignIn/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import CreateAccount from "./SignIn/CreateAccount";
import ForgotPassword from "./SignIn/ForgotPassword";
import TwoFactor from "./SignIn/TwoFactor";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";

const root = ReactDOM.createRoot(document.getElementById('root'));

function AppWrapper() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<PrivateRoute user={true}><Home /></PrivateRoute>} />
                <Route path="/two-factor-authentication/:email" element={<TwoFactor />} />
            </Routes>
        </BrowserRouter>
    );
}

root.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
