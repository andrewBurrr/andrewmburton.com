import React from "react";
import { useAuth } from "contexts/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const { user, loading } = useAuth();
    console.log("Other thing: ", user !== null, loading);
    if (loading) {
        return (<></>);
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoute };