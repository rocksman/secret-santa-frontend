import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const {isAuthenticated} = useSelector(state => state.auth)
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  return React.cloneElement(element, rest);
};

export default ProtectedRoute;