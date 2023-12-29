import './HomePage.css';
import HomePageCard from '../../components/homepagecard/HomePageCard.jsx';
import activitiesImage from '../../assets/images/activitiesImage1.jpg';
import campgroundImage from '../../assets/images/campgroundImage1.jpg';
import multimediaImage from '../../assets/images/multimediaImage1.jpg';
import nationalParkImage from '../../assets/images/nationalParkImage1.jpg';

function HomePage() {
    return (
        <main className='outer-container-homepage'>
            <section className='homepage-header'>
                <div className='homepage-header-content'>
                    <h1>Ben je van plan om de Nationale Parken in de Verenigde Staten te gaan bezoeken?</h1>
                    <h4>Dan is dit de website waar je moet wezen. Je vindt hier veel informatie over de diverse parken,
                        zoals de accommodaties waar je kan verblijven, de activiteiten die je er kan ondernemen,
                        maar ook een overzicht van de voorzieningen die in de parken aanwezig zijn.</h4>
                    <h4>Genoeg informatie dus om je bezoek aan deze geweldige parken te kunnen gaan plannen.</h4>
                </div>
            </section>

            <section className='homepage-cards-outer-container'>
                    <div className='homepage-cards-inner-container'>
                        <HomePageCard
                            backgroundImg={nationalParkImage}
                            title='De Nationale Parken'
                            linkUrl='/parken'
                            className='homepage-card'
                        />
                        <HomePageCard
                            backgroundImg={campgroundImage}
                            title='Campings & Lodges'
                            linkUrl='/accommodaties'
                            className='homepage-card'
                        />
                        <HomePageCard
                            backgroundImg={activitiesImage}
                            title='Activiteiten'
                            linkUrl='/activiteiten'
                            className='homepage-card'
                        />
                        <HomePageCard
                            backgroundImg={multimediaImage}
                            title='Foto & Video'
                            linkUrl='/multimedia'
                            className='homepage-card'
                        />
                    </div>
            </section>
        </main>
);
}

export default HomePage;
