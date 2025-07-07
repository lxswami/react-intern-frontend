import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const isOnline = navigator.onLine;

    if (!token || !isOnline) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
