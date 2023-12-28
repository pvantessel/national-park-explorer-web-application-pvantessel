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
        console.log("Ik ben opnieuw gemount");
        // Haal de token op uit Local Storage
        const token = localStorage.getItem('token');

        // Is er een token, haal dan de info van de gebruiker op
        if (token) {
            // const decoded = jwtDecode(token);
            void fetchUserData(token);
            console.log(`Inhoud van token is: ${token}`);
        } else {
            console.log('er is geen token');
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
        // const decoded = jwtDecode(token);
        // console.log(decoded);

        // geef de token en redirect-link mee aan de fetchUserData functie
        void fetchUserData(token, `/profile`);
    }

    // Functie wordt gebruikt bij login- en het mount-effect.
    async function fetchUserData(token, redirectUrl) {
        try {
            // haal gebruikersdata op met de token en id van de user
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("we loggen nu hier de result")
            console.log(result);

            // zet de data in de state
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    // id: result.data.id,
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
            console.log("er ging wat mis")
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

        console.log('Gebruiker is uitgelogd!');
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
