import './Navigation.css';
import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import logo from '../../assets/images/NationalParkExplorer.png';
import Button from '../button/Button.jsx';

function Navigation() {
    const navigate = useNavigate();
    const {isAuth, logout, user} = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    console.log(`isAuth gevuld met: ${isAuth}`);

    return (
        <nav>
            <Link to="/">
              <span className='logo-container'>
                <img src={logo} alt="logo"/>
              </span>
            </Link>

            <div className='button-menu-container'>
                {!isAuth ?
                    <div className='login-register-div'>
                        <Button
                            buttonType='button'
                            clickHandler={() => navigate('/signin')}
                            buttonClass='styleButton'
                        >
                            Inloggen
                        </Button>

                        <Button
                            buttonType='button'
                            clickHandler={() => navigate('/signup')}
                            buttonClass='styleButton'
                        >
                            Registreren
                        </Button>
                    </div>
                    :
                    <div className='logout-name-div'>
                        <p className='displayEmail'>{user.email}</p>
                        <Button
                            buttonType='button'
                            clickHandler={logout}
                            buttonClass='styleButton'
                        >
                            Log out
                        </Button>
                    </div>
                }

                <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul className="menu-items">
                        <li onClick={closeMenu}>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/parken">De Nationale Parken</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/accommodaties">Campings & Lodges</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/activiteiten">Activiteiten</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link to="/multimedia">Foto & Video</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;