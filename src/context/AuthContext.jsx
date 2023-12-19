import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: '',
    });
    const navigate = useNavigate();

    function login(email) {
        toggleIsAuth({
            isAuth: true,
            user: email,
        });
        console.log('Gebruiker is ingelogd!');
        navigate('/profile')
    }

    function logout() {
        toggleIsAuth({
            isAuth: false,
            user: '',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/')
    }

    function signup() {
        console.log('Gebruiker registreren!');
        navigate('/signin')
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        logout: logout,
        login: login,
        signup: signup,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
