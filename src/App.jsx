import {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {AuthContext} from './context/AuthContext.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Footer from "./components/footer/Footer.jsx";
import HomePage from './pages/homepage/HomePage.jsx';
import AccommodationOverview from "./pages/accommodationoverview/AccommodationOverview.jsx";
import ActivitiesOverview from "./pages/activitiesoverview/ActivitiesOverview.jsx";
import MultiMedia from "./pages/multimedia/MultiMedia.jsx";
import ParkDetails from "./pages/parkdetails/ParkDetails.jsx";
import ParkOverview from "./pages/parkoverview/ParkOverview.jsx";
import Profile from './pages/profile/Profile.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import NotFound from './pages/notfound/NotFound.jsx';

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <Navigation/>
            <div className='main-content'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/accommodaties' element={<AccommodationOverview/>}/>
                    <Route path='/activiteiten' element={<ActivitiesOverview/>}/>
                    <Route path='/multimedia' element={<MultiMedia/>}/>
                    <Route path="/parkdetails/:id" element={<ParkDetails/>}/>
                    <Route path='/parken' element={<ParkOverview/>}/>
                    <Route path='/profile' element={isAuth ? <Profile/> : <p>Gebruiker is nog niet ingelogd</p>}/>
                    <Route path='/signin' element={isAuth ? <p>U bent al ingelogd</p> : <SignIn/>}/>
                    <Route path='/signup' element={isAuth ? <p>Log eerst uit om u te kunnen registreren</p> : <SignUp/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
