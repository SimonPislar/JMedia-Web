import React from "react";
import App from "./SignIn/App";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({ children, user}) => {
    if (!user) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
}

export default PrivateRoute;