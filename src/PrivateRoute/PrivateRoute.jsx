import React, { useContext } from 'react';
import { userContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loader} = useContext(userContext);

    const location = useLocation();
    if(loader){
        return <div>Loader</div>
    }
    if(user){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;