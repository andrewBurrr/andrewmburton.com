import React from "react";
import { useAuth } from "contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return (<></>);
    return user !== null ? <Navigate to="/" /> : <Outlet />;
}

export { PublicRoute };