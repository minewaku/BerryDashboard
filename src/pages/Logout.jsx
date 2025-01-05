import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
   const dispatch = useDispatch();
   dispatch({ type: 'LOGOUT' });
   return <Navigate to="/" replace />;
};

export default Logout;
