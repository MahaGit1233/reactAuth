import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const [token, setToken] = useState('');

    const userLogin = !!token;

    const loginHandler = (newToken) => {
        setToken(newToken);
    };

    const logoutHandler = () => {
        setToken(null);
    }

    const authContext = {
        token: token,
        isLoggedIn: userLogin,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;