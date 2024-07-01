import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedGuard = ({ children, ...rest }) => {

    const isAuthenticated = useSelector((state) => !!state.session.user);

    if (isAuthenticated) {
        return <>{children}</>; // Render children if authenticated
    }

    return <Redirect to="/login" {...rest} />; // Redirect to login or home if not authenticated
};

export default ProtectedGuard;
