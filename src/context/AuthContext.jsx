import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const navigate = useNavigate();

    // // Mounten
    useEffect(() => {
        // Haal de token op uit Local Storage
        const token = localStorage.getItem('token');

        // Is er een token, haal dan de info van de gebruiker op
        if (token) {
            const decodedJWT = jwtDecode(token);
            const userId = decodedJWT.sub

            void fetchUserData(userId, token);
        } else {
            // Is er geen token dan de status op 'done' zetten.
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(token) {
        // Plaats de token in de Local Storage
        localStorage.setItem('token', token);

        // Decoderen van het token en plaats in var decoded
        const decodedJWT = jwtDecode(token);
        const userId = decodedJWT.sub

        // geef de token en redirect-link mee aan de fetchUserData functie
        void fetchUserData(userId, token, `/profile`);
    }

    // Functie wordt gebruikt bij login- en het mount-effect.
    async function fetchUserData(userId, token, redirectUrl) {

        try {
            // haal gebruikersdata op met de token en id van de user
            const result = await axios.get(`https://api.datavortex.nl/nationalparkexplorer/users/${userId}`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // zet de data in de state
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    roles: result.data.authorities,
                    info: result.data.info,
                },
                status: 'done',
            });

            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernaartoe door
            // als we de navigate in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!
            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/');
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
