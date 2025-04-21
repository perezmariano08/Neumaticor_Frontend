import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RouteAdmin = () => {
    const user = useSelector((state) => state.user.user);

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return <Outlet />; // Muy importante para que se vean las rutas hijas
};

export default RouteAdmin;
